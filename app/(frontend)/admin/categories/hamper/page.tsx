"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";

import { FullScreenLoader } from "@/app/(frontend)/components/reusables/loader/loader";
import { DataTable } from "@/app/(frontend)/components/reusables/table/table";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { useDeleteHamperCategory } from "./hooks/useDeleteHamperCategory";
import { useHamperCategories } from "./hooks/useHamperCategories";


export default function HamperCategoriesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 4;

  const debouncedSearch = useDebounce(search, 1000);

  const { data, isPending, isFetching } = useHamperCategories({
    page,
    limit,
    search: debouncedSearch,
  });

  const { mutate: deleteHamperCategory } = useDeleteHamperCategory();
  const categories = data?.categories ?? [];
  const total = data?.total as number

  if (isPending && !data) {
    return <FullScreenLoader />;
  }

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full px-4 space-y-6">

        <Metadata
          title="Hamper Categories"
          desc="manage hamper categories"
        />

        {/* Search + Add Button */}
        <div className="flex flex-wrap gap-2 items-end justify-between">

          <BaseSearch
            label=""
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search hamper category"
            className="max-w-3xl sm:max-w-2xl lg:w-3xl py-2 px-5 rounded-3xl"
          />

          <Link href="/admin/categories/hamper/addcategory">
            <UniButton label="Add Hamper Category" />
          </Link>
        </div>

        {/* Table */}
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
                header: "Image",
                accessor: (item) => (
                  <div className="relative w-12 h-12">
                    <Image
                      src={item.image ?? ""}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      sizes="48px//"
                    />
                  </div>
                ),
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

                    <Link href={`/admin/categories/hamper/${item.id}`}>
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
                      onClick={() => deleteHamperCategory(item.id)}
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