"use client";

import Link from "next/link";
import { Eye, Package } from "lucide-react";
import { useState } from "react";
import { OrderStatus } from "@prisma/client";

import OrderStatusBadge from "./OrderStatusBadge";
import OrderFilters from "./OrderFilters";


import { useGetClientOrders } from "../hooks/useGetClientOrders";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { DataTable } from "@/app/(frontend)/components/reusables/table/table";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";

export default function MyOrders() {
  const [page, setPage] = useState(1);

  const [status, setStatus] =
    useState<OrderStatus | "all">("all");

  const {
    data,
    isLoading,
    isError,
  } = useGetClientOrders({
    page,
    limit: 10,
    status,
  });

  const orders = data?.orders ?? [];

  const handleStatusChange = (
    value: OrderStatus | "all"
  ) => {
    setStatus(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const columns = [
    {
      header: "Order",
      accessor: (order: (typeof orders)[number]) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>

          <div>
            <p className="font-medium">
              #{order.id.slice(-6).toUpperCase()}
            </p>

            <p className="text-sm text-muted-foreground">
              {new Date(
                order.createdAt
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "Total",
      accessor: (order: (typeof orders)[number]) => (
        <span className="font-semibold">
          PKR {order.total.toLocaleString()}
        </span>
      ),
    },

    {
      header: "Status",
      accessor: (order: (typeof orders)[number]) => (
        <OrderStatusBadge status={order.status} />
      ),
    },

    {
      header: "Action",
      accessor: (order: (typeof orders)[number]) => (
        <Link
          href={`/client/orders/${order.id}`}
          className="rounded-lg border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted"
        >
          <Eye size={16}/>
        </Link>
      ),
    },
  ];


  if(isLoading) return <ContentSkeleton/>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          My Orders
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          View and track your catering orders.
        </p>
      </div>

      {/* Status Filter */}
      <OrderFilters
        status={status}
        onStatusChange={handleStatusChange}
      />

      {/* Error */}
      {isError ? (
        <div className="rounded-md border py-10 text-center">
          <p className="font-medium">
            Unable to load orders
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      ) : (
        <>
          {/* Orders */}
          <DataTable
            items={orders}
            isLoading={isLoading}
            columns={columns}
          />

          {/* Pagination */}
          {data && (
            <ItemsPagination
              page={data.page}
              total={data.total}
              limit={data.limit}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}