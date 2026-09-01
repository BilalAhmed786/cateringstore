"use client";

import CustomerInformation from "./CustomerInformation";
import OrderHeader from "./OrderHeader";
import OrderItems from "./OrderItems";
import OrderNotes from "./OrderNotes";
import OrderTotal from "./OrderTotal";

import { ClientOrder } from "../../types/type";

interface OrderDetailsProps {
  order: ClientOrder;
}

export default function OrderDetails({
  order,
}: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      <OrderHeader order={order} />

      <CustomerInformation order={order} />

      <OrderItems order={order} />

      {order.notes && (
        <OrderNotes notes={order.notes} />
      )}

      <OrderTotal total={order.total} />
    </div>
  );
}