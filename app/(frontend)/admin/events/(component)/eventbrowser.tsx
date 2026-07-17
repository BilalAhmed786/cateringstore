"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash, Eye, EyeOff } from "lucide-react";
import { EntityFilters } from "../../../components/reusables/filters/entityfilters";
import { EntityGrid } from "../../../components/reusables/grid/entitygrid";
import { DropdownAction, GridItem } from "../../../components/reusables/grid/gridtypes";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useGetEvents } from "../hooks/usegetEvents";
import { useDeleteEvent } from "../hooks/usedeleteevent";
import { useEventCategories } from "../../categories/event/hooks/useEventCategories";
import { useToggleEvent } from "../hooks/usetoggleevent";

export default function EventBrowser({
  showFilters = true,
  selectable = false,
}) {
  const router = useRouter();

  /* ---------------- STATE ---------------- */
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);
  const limit = 6;

  /* ---------------- DATA ---------------- */
  const { data, isPending } = useGetEvents({
    status,
    category,
    search: debouncedSearch,
    page,
    limit,
  });

  const { data: categories } = useEventCategories({page:1,limit:100});
  const deleteMutation = useDeleteEvent();
  const toggleMutation = useToggleEvent();

  /* ---------------- HANDLERS ---------------- */
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

  /* ---------------- FILTERS ---------------- */
  const filters = [
    {
      key: "category",
      label: "Category",
      value: category,
      onChange: onCategoryChange,
      options: [
        { label: "All", value: "all" },
        ...(categories?.categories?.map((c) => ({
          label: c.name,
          value: c.id,
        })) ?? []),
      ],
    },
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
  ];

  /* ---------------- ACTIONS ---------------- */
  const getActions = (item: GridItem): DropdownAction[] => [
    {
      label: "View",
      icon: Eye,
      onClick: () => router.push(`/admin/events/viewdetail/${item.id}`),
    },
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => router.push(`/admin/events/${item.id}`),
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
          search={{
            value: search,
            onChange: onSearchChange,
            classname: "w-3xl",
          }}
        />
      )}

      <EntityGrid
        items={data?.items ?? []}
        isLoading={isPending}
        actions={getActions}
        selectable={selectable}
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