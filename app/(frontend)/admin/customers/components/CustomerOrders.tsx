"use client";

import { ShoppingBag } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";

import type { CustomerOrder } from "../types/type";
import { CustomerOrderItem } from "./CustomerOrderItem";


interface Props {
  orders: CustomerOrder[];
}

export function CustomerOrders({ orders }: Props) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Customer Orders
        </CardTitle>
      </CardHeader>

      <CardContent>
        {orders.length === 0 ? (
          <p className="text-muted-foreground">
            This customer has no orders.
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <CustomerOrderItem
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}