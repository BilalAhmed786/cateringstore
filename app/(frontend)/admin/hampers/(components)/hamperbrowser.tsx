"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react";

import { EntityFilters } from "../../reusable/filters/entityfilters";
import { EntityGrid } from "../../reusable/grid/entitygrid";
import { RatingSummary } from "../../reusable/ratingsummary/ratingsummary";
import { DropdownAction, GridItem } from "../../reusable/grid/gridtypes";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { useGetHampers } from "../hooks/usegethampers";
import { useDeleteHamper } from "../hooks/usedeletehamper";
import { useToggleHamper } from "../hooks/usetogglehamper";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";

export default function HamperBrowser({
  showFilters = true,
  selectable = false,
}) {
  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 800);
  const limit = 5;

  const { data, isPending } = useGetHampers({
    status,
    dateFilter,
    search:debouncedSearch,
   });

  const deleteMutation = useDeleteHamper();
  const toggleMutation = useToggleHamper();
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
      onClick: () => router.push(`/admin/hampers/viewdetail/${item.id}`),
    },
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => router.push(`/admin/hampers/${item.id}`),
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

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6">
      {showFilters && (
        <EntityFilters
          filters={filters}
          search={{ value: search, onChange: onSearchChange,classname:"w-3xl" }}
        />
      )}

      <EntityGrid
        items={data?.items ?? []}
        isLoading={isPending}
        actions={getActions}
        selectable={selectable}
        renderPrice={(i) => (
          <span>
            Rs {i.finalPrice}
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

      <ItemsPagination
        page={page}
        limit={limit}
        total={data?.total ?? 0}
        onPageChange={setPage}
      />
    </div>
  );
}