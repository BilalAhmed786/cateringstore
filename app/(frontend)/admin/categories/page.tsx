"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { BaseSearch } from "../../components/reusables/search/search";
import { DataTable } from "../../components/reusables/table/table";
import {ItemsPagination } from "../../components/reusables/pagination/pagination";
import { useCategories } from "./hooks/usecategories";
import { useDeleteCategory } from "./hooks/useDeleteCategory";
import { FullScreenLoader } from "../../components/reusables/loader/loader";
import { useDebounce } from "../../components/reusables/hooks/useDebounce";



export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 4;

  const debouncedSearch = useDebounce(search,1000);

  const { data, isPending, isFetching } = useCategories({
    page,
    limit,
    search: debouncedSearch,
  });

  const { mutate: deleteCategory } = useDeleteCategory();

  const categories = data?.categories ?? [];
  const total = data?.total ?? 0;

  /* ✅ Show fullscreen loader ONLY on first load */
  if (isPending && !data) {
    return <FullScreenLoader />;
  }

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-5xl px-4 space-y-6">
        {/* Top bar */}
        <div className="flex flex-wrap gap-2 items-end justify-between">
          <BaseSearch
            label="Categories"
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1); // ✅ ESLint-safe, intentional
            }}
            placeholder="Search category"
            className="max-w-3xl sm:max-w-2xl lg:w-3xl py-2 px-5 rounded-3xl"
          />

          <Link href="/admin/categories/addcategory">
            <UniButton label="Add Category" />
          </Link>
        </div>

        {/* Table wrapper (smooth UX) */}
        <div
          className={`transition-opacity duration-200 ease-in-out ${
            isFetching ? "opacity-60 pointer-events-none" : "opacity-100"
          }`}
        >
          <DataTable
            items={categories}
            isLoading={isFetching}
            columns={[
              {
                header: "Name",
                accessor: (item) => item.name,
              },
              {
                header: "Created At",
                accessor: (item) =>
                  new Date(item.createdAt).toLocaleDateString(),
              },
              {
                header: "Actions",
                accessor: (item) => (
                  <div className="flex gap-2">
                    <Link href={`/admin/categories/${item.id}`}>
                      <UniButton
                        size="sm"
                        variant="outline"
                        icon={<Edit className="w-4 h-4" />}
                      />
                    </Link>
                    <UniButton
                      size="sm"
                      variant="destructive"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => deleteCategory(item.id)}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>

        {/* Pagination */}
        <ItemsPagination
          page={page}
          total={total}
          limit={limit}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
