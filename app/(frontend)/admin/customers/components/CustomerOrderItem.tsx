"use client";

import Link from "next/link";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import type { CustomerOrder } from "../types/type";
import { useGetStoreSettings } from "../../settings/store/hooks/useGetStoreSettings";
interface Props {
  order: CustomerOrder;
}

export function CustomerOrderItem({ order }: Props) {
  const { data } = useGetStoreSettings();

  return (
    <div className="flex min-w-0 flex-wrap items-center justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0">
      <div className="min-w-0">
        <p className="truncate font-medium">Order #{order.id.slice(0, 8)}</p>

        <p className="text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="font-medium">
          {data?.store.currency} {order.total.toLocaleString()}
        </span>

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {order.status}
        </span>

        <Link href={`/admin/orders/${order.id}`}>
          <UniButton size="sm" variant="outline" label="View" />
        </Link>
      </div>
    </div>
  );
}
