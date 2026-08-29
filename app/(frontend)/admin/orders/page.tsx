"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { DataTable } from "@/app/(frontend)/components/reusables/table/table";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useGetOrders } from "./hooks/useOrders";
import { useGetStoreSettings } from "../settings/store/hooks/useGetStoreSettings";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Cooking", value: "COOKING" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 10;

  const debouncedSearch = useDebounce(search, 700);
  const {data:storedata} = useGetStoreSettings()
  const { data, isFetching } = useGetOrders({
    page,
    limit,
    search: debouncedSearch,
    status,
  });

  const orders = data?.orders ?? [];
  const total = data?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full px-4 space-y-6">

        <Metadata
          title="Orders"
          desc="Manage customer orders"
        />

        {/* Search + Status */}
        <div className="flex flex-wrap items-end justify-between gap-4">

          <BaseSearch
            label=""
            value={search}
            onChange={handleSearch}
            placeholder="Search orders..."
            className="max-w-3xl sm:max-w-2xl lg:w-3xl py-2 px-5 rounded-3xl"
          />

          <select
            value={status}
            onChange={(e) => handleStatus(e.target.value)}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          >
            {statusOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div
          className={`transition-opacity duration-200 ${
            isFetching
              ? "opacity-60 pointer-events-none"
              : "opacity-100"
          }`}
        >
          {isFetching ? (
            <Loader />
          ) : (
            <DataTable
              items={orders}
              isLoading={isFetching}
              columns={[
                {
                  header: "Order",
                  accessor: (order) => (
                    <span className="font-medium">
                      #{order.id.slice(0, 8)}
                    </span>
                  ),
                },

                {
                  header: "Customer",
                  accessor: (order) =>
                    order.guestName ??
                    order.user?.name ??
                    "Guest",
                },

                {
                  header: "Email",
                  accessor: (order) =>
                    order.guestEmail ??
                    order.user?.email ??
                    "-",
                },

                {
                  header: "Total",
                  accessor: (order) => (
                    <span className="font-medium">
                      {storedata?.store.currency} {order.total.toLocaleString()}
                    </span>
                  ),
                },

                {
                  header: "Status",
                  accessor: (order) => (
                    <OrderStatusBadge
                      status={order.status}
                    />
                  ),
                },

                {
                  header: "Created",
                  accessor: (order) =>
                    new Date(
                      order.createdAt
                    ).toLocaleDateString(),
                },

                {
                  header: "Actions",
                  accessor: (order) => (
                    <Link
                      href={`/admin/orders/${order.id}`}
                    >
                      <UniButton
                        size="sm"
                        variant="outline"
                        icon={
                          <Eye className="h-4 w-4" />
                        }
                      />
                    </Link>
                  ),
                },
              ]}
            />
          )}
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

function OrderStatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    COOKING: "bg-orange-100 text-orange-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ??
        "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}