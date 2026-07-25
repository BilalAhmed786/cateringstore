"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react";

import { EntityFilters } from "../../../components/reusables/filters/entityfilters";
import { EntityGrid } from "../../../components/reusables/grid/entitygrid";
import { RatingSummary } from "../../../components/reusables/ratingsummary/ratingsummary";

import { DropdownAction, GridItem } from "../../../components/reusables/grid/gridtypes";
import { useGetPackages } from "../hooks/usegetpackages";
import { useDeletePackage } from "../hooks/usedeletepackage";
import { useTogglePackage } from "../hooks/usetogglepackage";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";

import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
type PackageBrowserProps = {
  showFilters?: boolean;
  selectable?: boolean;
  onSelectItem?: (item:GridItem) => void;
};

export default function PackageBrowser({
  showFilters = true,
  selectable = false,
  onSelectItem,
}: PackageBrowserProps) {
  const router = useRouter();


  // Filter + Pagination State
  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 800);
  const limit = 5;

  const { data, isPending } = useGetPackages({
    status,
    dateFilter,
    search:debouncedSearch,
    page,
    limit,
  });

  const deleteMutation = useDeletePackage();
  const toggleMutation = useTogglePackage();

  /* ---------------- FILTER HANDLERS ---------------- */
  const onStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const onDateFilterChange = (value: string) => {
    setDateFilter(value);
    setPage(1);
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  /* ---------------- FILTERS ---------------- */
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
      key: "dateFilter",
      label: "Date",
      value: dateFilter,
      onChange: onDateFilterChange,
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
      label: "View",
      icon: Eye,
      onClick: () => router.push(`/admin/packages/viewdetail/${item.id}`),
    },
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
      {/* ---------------- FILTERS ---------------- */}
      {showFilters && (
        <EntityFilters
          filters={filters}
          search={{ value: search, onChange: onSearchChange,classname:"w-3xl" }}
        />
      )}

      {/* ---------------- GRID ---------------- */}
      <EntityGrid
        items={data?.items ?? []}
        isLoading={isPending}
        actions={getActions}
        selectable={selectable}
        onSelect={onSelectItem} 
        renderPrice={(i) => (
          <span>
            Rs {i.finalPrice}{" "}
            {i.originalPrice && (
              <span className="line-through text-sm text-gray-400 ml-2">
                Rs {i.originalPrice}
              </span>
            )}
          </span>
        )}
        renderMeta={(i) => (
          <RatingSummary
            rating={i.averageRating ?? 0}
            count={i.totalReviews ?? 0}
          />
        )}
      />

      {/* ---------------- PAGINATION ---------------- */}
      <ItemsPagination
        page={page}
        limit={limit}
        total={data?.total ?? 0}
        onPageChange={setPage}
      />
    </div>
  );
}