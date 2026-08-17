"use client";

import Link from "next/link";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

import type { CustomerOrder } from "../types/type";

interface Props {
  order: CustomerOrder;
}

export function CustomerOrderItem({
  order,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-md border p-4">

      {/* Order information */}
      <div>
        <p className="font-medium">
          Order #{order.id.slice(0, 8)}
        </p>

        <p className="text-sm text-muted-foreground">
          {new Date(
            order.createdAt
          ).toLocaleDateString()}
        </p>
      </div>

      {/* Order details */}
      <div className="flex items-center gap-4">

        <span className="font-medium">
          Rs {order.total.toLocaleString()}
        </span>

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {order.status}
        </span>

        <Link href={`/admin/orders/${order.id}`}>
          <UniButton
            size="sm"
            variant="outline"
            label="View"
          />
        </Link>

      </div>
    </div>
  );
}