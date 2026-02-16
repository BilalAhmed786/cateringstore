"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react";

import { useAllCategories } from "../../menu-items/hooks/usegetallcategories";
import { useGetMenuItems } from "../../menu-items/hooks/useGetMenuItems";


import { EntityFilters } from "../../reusable/filters/entityfilters";
import { EntityGrid } from "../../reusable/grid/entitygrid";
import { RatingSummary } from "../../reusable/ratingsummary/ratingsummary";

import { DropdownAction, GridItem } from "../../reusable/grid/gridtypes";
import { MenuItemBrowserProps } from "../types/types";
import { useDeleteMenuItem } from "../hooks/usedeletemenuItem";
import { useToggleMenuItem } from "../hooks/usetogglemenuItem";

export default function MenuItemBrowser({
  showFilters = true,
  selectable = false,
  onSelectItem,
}: MenuItemBrowserProps) {
  const router = useRouter();

  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const { data: categories = [] } = useAllCategories();
  const { data, isPending } = useGetMenuItems({ status, category, search });

  const deleteMutation = useDeleteMenuItem();
  const toggleMutation = useToggleMenuItem();

  const filters = [
    {
      key: "status",
      label: "Status",
      value: status,
      onChange: setStatus,
      options: [
        { label: "All", value: "all" },
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
    {
      key: "category",
      label: "Category",
      value: category,
      onChange: setCategory,
      options: [
        { label: "All", value: "all" },
        ...categories.map((c) => ({
          label: c.name,
          value: c.id,
        })),
      ],
    },
  ];

  // ✅ Dropdown actions are menu-item specific
  const getActions = (item: GridItem): DropdownAction[] => [
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => router.push(`/admin/menu-items/${item.id}`),
    },
    {
      label: item.available ? "Deactivate" : "Activate",
      icon: item.available ? EyeOff : Eye,
      onClick: () =>
        toggleMutation.mutate({
          id: item.id,
          available: item.available,
        }),
    },
    {
      label: "Delete",
      icon: Trash,
      variant: "danger",
      onClick: () => deleteMutation.mutate(item.id),
    },
  ];

  return (
    <div className="space-y-6">
      {showFilters && (
        <EntityFilters
          filters={filters}
          search={{ value: search, onChange: setSearch }}
        />
      )}

      <EntityGrid
        items={data?.items ?? []}
        isLoading={isPending}
        selectable={selectable}
        onSelect={onSelectItem}
        actions={getActions}
        renderPrice={(i) => <span>Rs {i.price}</span>}
        renderMeta={(i) => (
          <RatingSummary
            rating={i.averageRating}
            count={i.totalReviews}
          />
        )}
      />
    </div>
  );
}
