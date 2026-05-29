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
import { useDeleteEventCategory } from "./hooks/useDeleteEventCategory";
import { useEveCategories } from "./hooks/useEventCategories";


export default function EventCategoriesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 4;

  const debouncedSearch = useDebounce(search, 1000);

  const { data, isPending, isFetching } = useEveCategories({
    page,
    limit,
    search: debouncedSearch,
  });

  const { mutate: deleteEventCategory } = useDeleteEventCategory();
  const categories = data?.categories ?? [];
  const total = data?.total as number

  if (isPending && !data) {
    return <FullScreenLoader />;
  }

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full px-4 space-y-6">

        <Metadata
          title="Event Categories"
          desc="manage event categories"
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
            placeholder="Search event category"
            className="max-w-3xl sm:max-w-2xl lg:w-3xl py-2 px-5 rounded-3xl"
          />

          <Link href="/admin/categories/event/addcategory">
            <UniButton label="Add Event Category" />
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

                    <Link href={`/admin/categories/event/${item.id}`}>
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
                      onClick={() => deleteEventCategory(item.id)}
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