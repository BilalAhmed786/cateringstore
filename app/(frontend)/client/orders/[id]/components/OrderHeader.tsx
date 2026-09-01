"use client";

import { CalendarDays } from "lucide-react";
import OrderStatusBadge from "../../components/OrderStatusBadge";
import { ClientOrder } from "../../types/type";


interface OrderHeaderProps {
  order: ClientOrder ;
}

export default function OrderHeader({
  order,
}: OrderHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          Order #{order.id.slice(-6).toUpperCase()}
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />

          {new Date(order.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          )}
        </div>
      </div>

      <OrderStatusBadge status={order.status} />
    </div>
  );
}