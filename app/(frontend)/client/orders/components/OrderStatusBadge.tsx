// components/client/orders/OrderStatusBadge.tsx

import { OrderStatus } from "@prisma/client";


interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export default function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const statusStyles: Record<OrderStatus, string> = {
    PENDING:
      "bg-muted text-muted-foreground",

    CONFIRMED:
      "bg-blue-100 text-blue-700",

    COOKING:
      "bg-yellow-100 text-yellow-700",

    DELIVERED:
      "bg-green-100 text-green-700",

    CANCELLED:
      "bg-red-100 text-red-700",
  };

  const statusLabels: Record<OrderStatus, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    COOKING: "Preparing",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}