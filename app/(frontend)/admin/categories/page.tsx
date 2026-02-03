"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { BaseSearch } from "../../components/reusables/search/search";
import { DataTable } from "../../components/reusables/table/table";
import { MenuItemsPagination } from "../../components/reusables/pagination/pagination";
import { useCategories } from "./hooks/usecategories";



export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 4;

  // ✅ Fetch categories using your hook
  const { data, isLoading } = useCategories({ page, limit, search });

  // React Query returns data in your CategoryResponse type
  const categories = data?.categories || [];
  const total = data?.total || 0;

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-5xl px-4">
        {/* Top bar */}
        <div className="flex items-end justify-between mb-6">
          <BaseSearch
            label="Categories"
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1); // reset page on search
            }}
            placeholder="Search category"
            className="w-3xl py-3 px-5 rounded-3xl"
          />

          <Link href="/admin/categories/addcategory">
            <UniButton label="Add Category" />
          </Link>
        </div>

        {/* Table */}
        <DataTable
          items={categories}
          isLoading={isLoading}
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
              accessor: () => (
                <div className="flex gap-2">
                  <UniButton
                    size="sm"
                    variant="outline"
                    icon={<Edit className="w-4 h-4" />}
                  />
                  <UniButton
                    size="sm"
                    variant="destructive"
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </div>
              ),
            },
          ]}
        />

        {/* Pagination */}
        <div className="mt-6">
          <MenuItemsPagination
            page={page}
            total={total}
            limit={limit}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
