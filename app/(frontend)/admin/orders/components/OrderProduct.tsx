"use client";

import Image from "next/image";
import { Package } from "lucide-react";
import { OrderItemDisplay } from "../types/type";


interface Props {
  item: OrderItemDisplay;
}

export function OrderProduct({ item }: Props) {
  return (
    <div className="flex items-center gap-4 m-5">
      {/* Image */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Information */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">
          {item.title}
        </p>

        <p className="text-sm text-muted-foreground">
          Quantity: {item.quantity}
        </p>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="font-semibold">
          Rs {item.price.toLocaleString()}
        </p>

        <p className="text-sm text-muted-foreground">
          Rs{" "}
          {(item.price * item.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
}