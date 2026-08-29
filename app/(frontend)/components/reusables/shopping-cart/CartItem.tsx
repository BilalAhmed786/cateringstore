"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { QuantitySelector } from "../storefront-grid/QuantitySelector";
import { useCartStore } from "@/app/(frontend)/store/useCartStore";
import { UniButton } from "../button/button";
import { CartItemProps } from "./carttypes";

export function CartItem({
  item,
  currency
 }:CartItemProps) {
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 rounded-lg border p-3">

      <div className="relative h-20 w-20 overflow-hidden rounded-lg">
        <Image
          src={
            item.images?.[0]?.url ??
            item.image ??
            "/placeholder.png"
          }
          alt={item.title ?? ""}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">

        <div>
          <h3 className="font-semibold">
            {item.title ?? item.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {currency} {item.price ?? item.finalPrice}
          </p>
        </div>

        <div className="flex items-center justify-between">

          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => increase(item.id)}
            onDecrease={() => decrease(item.id)}
          />

          <UniButton
            size="icon"
            variant="ghost"
            icon={<Trash2 className="h-4 w-4 text-red-500" />}
            onClick={() => removeItem(item.id)}
          />

        </div>

      </div>

    </div>
  );
}