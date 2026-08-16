"use client";

import { Order } from "../types/type";
import { CustomerInformation } from "./CustomerInformation";
import { OrderItemsSection } from "./OrderItemsSection";
import { OrderSummaryCards } from "./OrderSummaryCards";
import { OrderTotal } from "./OrderTotal";


interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      <OrderSummaryCards order={order} />

      <CustomerInformation order={order} />

      {order.items.length > 0 && (
        <OrderItemsSection
          title="Menu Items"
          items={order.items.map((item) => ({
            id: item.id,
            title: item.menu.title,
            image: item.menu.images?.[0]?.url,
            quantity: item.quantity,
            price: item.price,
          }))}
        />
      )}

      {order.orderPackages.length > 0 && (
        <OrderItemsSection
          title="Packages"
          items={order.orderPackages.map((item) => ({
            id: item.id,
            title: item.package.name,
            image: item.package.image,
            quantity: item.quantity,
            price: item.price,
          }))}
        />
      )}

      {order.orderEvents.length > 0 && (
        <OrderItemsSection
          title="Events"
          items={order.orderEvents.map((item) => ({
            id: item.id,
            title: item.event.name,
            image: item.event.image,
            quantity: item.quantity,
            price: item.price,
          }))}
        />
      )}

      {order.orderHampers.length > 0 && (
        <OrderItemsSection
          title="Hampers"
          items={order.orderHampers.map((item) => ({
            id: item.id,
            title: item.hamper.name,
            image: item.hamper.image,
            quantity: item.quantity,
            price: item.price,
          }))}
        />
      )}

      <OrderTotal order={order} />
    </div>
  );
}