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
import { MenuItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";

export default function MenuItemBrowser({
  showFilters = true,
  selectable = false,
  onSelectItem,
}: MenuItemBrowserProps) {
  const router = useRouter();

  // Filter + Pagination State
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data: categories = [] } = useAllCategories();
  const { data, isPending } = useGetMenuItems({
    status,
    category,
    search,
    page,
    limit,
  });

  const deleteMutation = useDeleteMenuItem();
  const toggleMutation = useToggleMenuItem();

  // ✅ Wrapped handlers to reset page on filter change
  const onStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const onCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const filters = [
    {
      key: "status",
      label: "Status",
      value: status,
      onChange: onStatusChange,
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
      onChange: onCategoryChange,
      options: [
        { label: "All", value: "all" },
        ...categories.map((c) => ({ label: c.name, value: c.id })),
      ],
    },
  ];

  // Dropdown actions
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
          search={{ value: search, onChange: onSearchChange }}
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
          <RatingSummary rating={i.averageRating} count={i.totalReviews} />
        )}
      />

      <MenuItemsPagination
        page={page}
        limit={limit}
        total={data?.total ?? 0}
        onPageChange={setPage}
      />
    </div>
  );
}
