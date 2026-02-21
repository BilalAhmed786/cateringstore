"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react";
import { EntityFilters } from "../../reusable/filters/entityfilters";
import { EntityGrid } from "../../reusable/grid/entitygrid";
import { RatingSummary } from "../../reusable/ratingsummary/ratingsummary";
import { DropdownAction, GridItem } from "../../reusable/grid/gridtypes";
import { useGetPackages } from "../hooks/usegetpackages";
import { useDeletePackage } from "../hooks/usedeletepackage";
import { useTogglePackage } from "../hooks/usetogglepackage";



/* ---------------- TYPES ---------------- */


/* ---------------- COMPONENT ---------------- */
export default function PackageBrowser({
  showFilters = true,
  selectable=false
}) {
  const router = useRouter();

  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isPending } = useGetPackages({
    status,
    dateFilter,
    search,
  });

  const deleteMutation = useDeletePackage();
  const toggleMutation = useTogglePackage();

  /* ---------------- FILTERS ---------------- */
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
      key: "dateFilter",
      label: "Date",
      value: dateFilter,
      onChange: setDateFilter,
      options: [
        { label: "All", value: "all" },
        { label: "Past 7 Days", value: "7days" },
        { label: "Past 30 Days", value: "30days" },
      ],
    },
  ];

  /* ---------------- ACTIONS ---------------- */
  const getActions = (item: GridItem): DropdownAction[] => [
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => router.push(`/admin/packages/${item.id}`),
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
        actions={getActions}
        selectable={selectable}
        renderPrice={(i) => <span>Rs {i.price}</span>}
        renderMeta={(i) => (
          <RatingSummary    
            rating={i.averageRating ?? 0}
            count={i.totalReviews ?? 0}
          />
        )}
      />
    </div>
  );
}
