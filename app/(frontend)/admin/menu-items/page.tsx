"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAllCategories } from "./hooks/usegetallcategories";
import { useGetMenuItems } from "./hooks/useGetMenuItems";
import { BaseSelect } from "../../components/reusables/filters/filterselect";
import { BaseSearch } from "../../components/reusables/search/search";
import { MenuItemsPagination } from "../../components/reusables/pagination/pagination";
import { MenuItemsGrid } from "./(components)/menuitemsgrid";
import { UniButton } from "../../components/reusables/button/button";
import { useDeleteMenuItem } from "./hooks/usedeletemenuItem";
import { useToggleMenuItem } from "./hooks/usetogglemenuItem";

export default function MenuItemsPage() {
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data: categories = [] } = useAllCategories();
  const { data, isLoading } = useGetMenuItems({
    status,
    category,
    search,
    dateFilter,
    page,
    limit,
  });

  // Hooks for delete and toggle
  const deleteMutation = useDeleteMenuItem();
  const toggleMutation = useToggleMenuItem();

  const handleDelete = (id: string) => deleteMutation.mutate(id);
  const handleToggle = (id: string, available: boolean) =>
    toggleMutation.mutate({ id, available });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Menu Items</h1>
        <Link href="/admin/menu-items/addmenu">
          <UniButton label="Add Menu" />
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-7 items-center">
        <BaseSelect
          label="Status"
          value={status}
          onChange={(val) => {
            setStatus(val);
            setPage(1);
          }}
          options={[
            { label: "All", value: "all" },
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
          ]}
        />

        <BaseSelect
          label="Category"
          value={category}
          onChange={(val) => {
            setCategory(val);
            setPage(1);
          }}
          options={[
            { label: "All", value: "all" },
            ...categories.map((c) => ({ label: c.name, value: c.id })),
            { label: "Add New Category", value: "add-new" },
          ]}
        />

        <BaseSelect
          label="Date"
          value={dateFilter}
          onChange={(val) => {
            setDateFilter(val);
            setPage(1);
          }}
          options={[
            { label: "All", value: "all" },
            { label: "Past 7 Days", value: "past7" },
          ]}
        />

        <BaseSearch
          label="Search"
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Search by title..."
          className="max-w-3xl sm:max-w-2xl lg:w-3xl py-2 px-5 rounded-3xl"
        />
      </div>

      {/* Grid */}
      <MenuItemsGrid
        items={items}
        isLoading={isLoading}
        onDelete={handleDelete}
        onToggleStatus={handleToggle}
      />

      {/* Pagination */}
      <MenuItemsPagination
        page={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
