"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { BaseSearch } from "../../components/reusables/search/search";
import { DataTable } from "../../components/reusables/table/table";
import { ItemsPagination } from "../../components/reusables/pagination/pagination";
import { FullScreenLoader } from "../../components/reusables/loader/loader";
import { useDebounce } from "../../components/reusables/hooks/useDebounce";
import { useEvents } from "./hooks/useEvents";
import { useDeleteEvent } from "./hooks/usedeleteevent";


export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 4;

  const debouncedSearch = useDebounce(search, 1000);

  const { data, isPending, isFetching } = useEvents({
    page,
    limit,
    search: debouncedSearch,
  });

  const { mutate: deleteEvent } = useDeleteEvent();

  const events = data?.events ?? [];
  const total = data?.total ?? 0;

  if (isPending && !data) {
    return <FullScreenLoader />;
  }

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-5xl px-4 space-y-6">
        {/* Top bar */}
        <div className="flex flex-wrap gap-2 items-end justify-between">
          <BaseSearch
            label="Events"
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search event"
            className="max-w-3xl sm:max-w-2xl lg:w-3xl py-2 px-5 rounded-3xl"
          />

          <Link href="/admin/events/add">
            <UniButton label="Add Event" />
          </Link>
        </div>

        {/* Table wrapper */}
        <div
          className={`transition-opacity duration-200 ease-in-out ${
            isFetching ? "opacity-60 pointer-events-none" : "opacity-100"
          }`}
        >
          <DataTable
            items={events}
            isLoading={isFetching}
            columns={[
              {
                header: "Title",
                accessor: (item) => item.title,
              },
              {
                header: "Status",
                accessor: (item) => item.status,
              },
              {
                header: "Created At",
                accessor: (item) =>
                  new Date(item.createdAt).toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                  }),
              },
              {
                header: "Actions",
                accessor: (item) => (
                  <div className="flex gap-2">
                    <Link href={`/admin/events/${item.id}`}>
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
                      onClick={() => deleteEvent(item.id)}
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

