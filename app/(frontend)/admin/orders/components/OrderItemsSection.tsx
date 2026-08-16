"use client";

import { Package } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";
import { OrderProduct } from "./OrderProduct";
import { orderItemProps } from "../types/type";





export function OrderItemsSection({
  title,
  items,
}: orderItemProps) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y">
          {items.map((item) => (
            <OrderProduct
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}