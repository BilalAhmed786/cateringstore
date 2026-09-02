"use client";

import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import { useGetClientOrders } from "@/app/(frontend)/client/orders/hooks/useGetClientOrders";
import OrderStatusBadge from "@/app/(frontend)/client/orders/components/OrderStatusBadge";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/(frontend)/components/ui/card";



export default function RecentOrders() {
  const { data, isLoading, isError } = useGetClientOrders({
    page: 1,
    limit: 3,
    status: "all",
  });

  if (isLoading) {
    return <ContentSkeleton />;
  }

  const orders = data?.orders ?? [];

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-start justify-between border-b px-5 py-4">
        <div>
          <CardTitle className="text-base">
            Recent Orders
          </CardTitle>

          <CardDescription className="mt-1">
            Your latest catering orders
          </CardDescription>
        </div>

        <Link
          href="/client/orders"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-0">
        {isError ? (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-destructive">
              Failed to load your orders.
            </p>
          </div>
        ) : orders.length === 0 ? (
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
          <div className="divide-y">
            {orders.map((order) => (
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
                      #{order.id.slice(-6).toUpperCase()}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex shrink-0 items-center gap-3">
                  <div className="text-right">
                    <p className="font-semibold">
                      PKR {order.total.toLocaleString()}
                    </p>

                    <div className="mt-1">
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>

                  <Link
                    href={`/client/orders/${order.id}`}
                    className="hidden rounded-lg border px-3 py-2 text-xs font-medium transition-colors hover:bg-muted sm:block"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}