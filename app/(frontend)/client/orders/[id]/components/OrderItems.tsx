"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/app/(frontend)/components/ui/card";
import { ClientOrder } from "../../types/type";
import OrderItemRow from "./OrderItemRow";



interface OrderItemsProps {
  order: ClientOrder;
}

export default function OrderItems({ order }: OrderItemsProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b px-5 py-4">
        <CardTitle className="text-base">
          Order Items
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
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
      </CardContent>
    </Card>
  );
}