"use client";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import React, { useState } from "react";
import { useAllCategories } from "../../menu-items/hooks/usegetallcategories";
import { useGetMenuItems } from "../../menu-items/hooks/useGetMenuItems";
import { useDeleteMenuItem } from "../../menu-items/hooks/usedeletemenuItem";
import { useToggleMenuItem } from "../../menu-items/hooks/usetogglemenuItem";
import { MenuItemsFilters } from "./menuitemsfilters";
import { MenuItemsGrid } from "./menuitemsgrid";
import { MenuItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { menuitembrowser } from "../types/type";





export function MenuItemsBrowser({
  showFilters = true,
  selectable = false,
  onSelectItem
}: menuitembrowser) {
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 8;

  const debouncedSearch = useDebounce(search, 1000);

  const { data: categories = [] } = useAllCategories();
  const { data, isPending } = useGetMenuItems({
    status,
    category,
    search: debouncedSearch,
    dateFilter,
    page,
    limit,
  });

  const deleteMutation = useDeleteMenuItem();
  const toggleMutation = useToggleMenuItem();

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="space-y-6">
      {showFilters && (
        <MenuItemsFilters
          status={status}
          category={category}
          dateFilter={dateFilter}
          search={search}
          categories={categories}
          onStatusChange={(v) => { setStatus(v); setPage(1); }}
          onCategoryChange={(v) => { setCategory(v); setPage(1); }}
          onDateChange={(v) => { setDateFilter(v); setPage(1); }}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
        />
      )}

      <MenuItemsGrid
        items={items}
        isLoading={isPending}
        selectable={selectable}
        onDelete={(id) => deleteMutation.mutate(id)}
        onToggleStatus={(id, available) =>
          toggleMutation.mutate({ id, available })
        }
        onSelect={onSelectItem}
      />

      <MenuItemsPagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
