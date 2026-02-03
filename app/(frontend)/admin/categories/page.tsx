"use client";

import { useMemo, useState } from "react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Category } from "@prisma/client";
import { BaseSearch } from "../../components/reusables/search/search";
import { DataTable } from "../../components/reusables/table/table";
import { MenuItemsPagination } from "../../components/reusables/pagination/pagination";
import { Edit,Trash2 } from "lucide-react";
import Link from "next/link";
const CATEGORIES: Category[] = [
  { id: "1", name: "Biryani", createdAt: new Date("2025-01-01") },
  { id: "2", name: "BBQ", createdAt: new Date("2025-01-01") },
  { id: "3", name: "Desserts", createdAt: new Date("2025-01-01") },
  { id: "4", name: "Rice", createdAt: new Date("2025-01-01") },
  { id: "5", name: "Chinese", createdAt: new Date("2025-01-01") },
  { id: "6", name: "Fast Food", createdAt: new Date("2025-01-01") },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 4;

  /** 1️⃣ Filter */
  const filtered = useMemo(() => {
    return CATEGORIES.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  /** 2️⃣ Paginate */
  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page]);

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
          items={paginatedData}
          isLoading={false}
          columns={[
            {
              header: "Name",
              accessor: (item) => item.name,
            },
            {
              header: "Created At",
              accessor: (item) => item.createdAt.toLocaleDateString(),
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
            total={filtered.length}
            limit={limit}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
