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



export default function HamperBrowser({ showFilters = true, selectable = false }) {
  const router = useRouter();

  const [status, setStatus] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isPending } = useGetHampers({
    status,
    dateFilter,
    search,
    page,
    limit,
  });

  const deleteMutation = useDeleteHamper();
  const toggleMutation = useToggleHamper();

  const filters = [
    {
      key: "status",
      label: "Status",
      value: status,
      onChange: (v: string) => {
        setStatus(v);
        setPage(1);
      },
      options: [
        { label: "All", value: "all" },
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
  ];

  const actions = (item: GridItem): DropdownAction[] => [
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
        toggleMutation.mutate({ id: item.id, available: item.available }),
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
        actions={actions}
        selectable={selectable}
        renderPrice={(i) => (
          <span>
            Rs {i.finalPrice}
            {i.originalPrice && (
              <span className="ml-2 line-through text-gray-400 text-sm">
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