"use client";

import Image from "next/image";
import { Button } from "@/app/(frontend)/components/ui/button";

import { EntityCartProps } from "../types/types";
import { CartCollapse } from "./cartcollapse";

export function EntityCart({
  title = "Selected Items",
  items,
  onChange,
  showTotal = true,
  Collapsible = false,
}: EntityCartProps) {
  const removeItem = (id: string) => {
    onChange(items.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    onChange(
      items.map((i) =>
        i.id === id
          ? {
              ...i,
              quantity: Math.max(1, qty),
            }
          : i
      )
    );
  };

  const total = items.reduce(
    (sum, i) => sum + ((i.price || i.finalPrice) ?? 0) * i.quantity,
    0
  );

  const cartContent = (
    <div className="rounded-xl border bg-white p-4 space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>

      {!items.length && (
        <p className="text-sm text-muted-foreground">
          No items selected
        </p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-lg border p-2"
        >
          {/* Image */}
          <div className="h-14 w-14 overflow-hidden rounded bg-slate-100">
            <Image
              src={
                item.images?.length
                  ? item.images[0].url
                  : item.image || "/placeholder.png"
              }
              alt={item.title || item.name || "Item"}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="font-medium">
              {item.title || item.name}
            </p>

            <p className="text-sm text-muted-foreground">
              Rs {item.price || item.finalPrice}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => updateQty(item.id, item.quantity - 1)}
              >
                -
              </Button>

              <span>{item.quantity}</span>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => updateQty(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Remove */}
          <Button
            type="button"
            size="sm"
            variant="destructive"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </Button>
        </div>
      ))}

      {showTotal && items.length > 0 && (
        <div className="border-t pt-3 text-right font-semibold">
          Total: Rs {Math.floor(total * 10) / 10}
        </div>
      )}
    </div>
  );

  if (!Collapsible) {
    return cartContent;
  }

  return (
    <CartCollapse
      itemsCount={items.length}
      total={total}
    >
      {cartContent}
    </CartCollapse>
  );
}