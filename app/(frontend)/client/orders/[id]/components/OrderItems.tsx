"use client";


import { ClientOrder } from "../../types/type";
import OrderItemRow from "./OrderItemRow";

interface OrderItemsProps {
  order: ClientOrder;
}

export default function OrderItems({
  order,
}: OrderItemsProps) {
  return (
    <div className="rounded-2xl border bg-background shadow-sm">
      <div className="border-b px-5 py-4">
        <h2 className="font-semibold">
          Order Items
        </h2>
      </div>

      <div className="divide-y">
        {order.items.map((item) => (
          <OrderItemRow
            key={`menu-${item.id}`}
            title={item.menu.title}
            type="Menu Item"
            quantity={item.quantity}
            price={item.price}
          />
        ))}

        {order.orderPackages.map((item) => (
          <OrderItemRow
            key={`package-${item.id}`}
            title={item.package.name}
            type="Package"
            quantity={item.quantity}
            price={item.price}
          />
        ))}

        {order.orderHampers.map((item) => (
          <OrderItemRow
            key={`hamper-${item.id}`}
            title={item.hamper.name}
            type="Hamper"
            quantity={item.quantity}
            price={item.price}
          />
        ))}

        {order.orderEvents.map((item) => (
          <OrderItemRow
            key={`event-${item.id}`}
            title={item.event.name}
            type="Event"
            quantity={item.quantity}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}