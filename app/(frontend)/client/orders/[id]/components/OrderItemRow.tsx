"use client";

import { Package } from "lucide-react";

interface OrderItemRowProps {
  title: string;
  type: string;
  quantity: number;
  price: number;
}

export default function OrderItemRow({
  title,
  type,
  quantity,
  price,
}: OrderItemRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Package className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="truncate font-medium">
            {title}
          </p>

          <p className="text-sm text-muted-foreground">
            {type} · Qty: {quantity}
          </p>
        </div>
      </div>

      <p className="shrink-0 font-semibold">
        PKR {(price * quantity).toLocaleString()}
      </p>
    </div>
  );
}