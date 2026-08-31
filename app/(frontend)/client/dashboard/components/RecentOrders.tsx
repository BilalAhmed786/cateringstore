"use client";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

interface RecentOrder {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: OrderStatus;
}

const recentOrders: RecentOrder[] = [
  {
    id: "1",
    orderNumber: "#ORD-1024",
    date: "Aug 28, 2026",
    total: 5500,
    status: "DELIVERED",
  },
  {
    id: "2",
    orderNumber: "#ORD-1025",
    date: "Aug 29, 2026",
    total: 3200,
    status: "PREPARING",
  },
  {
    id: "3",
    orderNumber: "#ORD-1026",
    date: "Aug 30, 2026",
    total: 7800,
    status: "CONFIRMED",
  },
];

function getStatusClass(status: OrderStatus) {
  switch (status) {
    case "DELIVERED":
      return "bg-green-100 text-green-700";

    case "CONFIRMED":
      return "bg-blue-100 text-blue-700";

    case "PREPARING":
      return "bg-yellow-100 text-yellow-700";

    case "READY":
      return "bg-purple-100 text-purple-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-muted text-muted-foreground";
  }
}

function formatStatus(status: OrderStatus) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function RecentOrders() {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="font-semibold">
            Recent Orders
          </h2>

          <p className="text-sm text-muted-foreground">
            Your latest catering orders
          </p>
        </div>

        <Link
          href="/client/orders"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Orders */}
      <div className="divide-y">

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-10 text-center">

            <Package className="mb-3 h-10 w-10 text-muted-foreground" />

            <h3 className="font-medium">
              No orders yet
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Your catering orders will appear here.
            </p>

          </div>
        ) : (
          recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/40"
            >

              {/* Left */}
              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">
                    {order.orderNumber}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {order.date}
                  </p>
                </div>

              </div>

              {/* Right */}
              <div className="flex shrink-0 items-end gap-3 sm:items-center">

                <div className="text-right">
                  <p className="font-semibold">
                    PKR {order.total.toLocaleString()}
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                      order.status,
                    )}`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>

                <Link
                  href={`/client/orders/${order.id}`}
                  className="hidden rounded-lg border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted sm:block"
                >
                  View
                </Link>

              </div>

            </div>
          ))
        )}

      </div>
    </section>
  );
}