"use client";

import Image from "next/image";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { PackageItem } from "../types/type";



interface SelectedPackageItemsProps {
  items: PackageItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export function SelectedPackageItems({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: SelectedPackageItemsProps) {
  if (!items.length) {
    return (
      <div className="rounded-xl border py-16 text-center text-muted-foreground">
        No menu items selected.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border bg-background shadow-sm transition hover:shadow-md"
        >
          <div className="relative h-40">
            <Image
              src={item.menuItem.images?.[0]?.url ?? "/placeholder.png"}
              alt={item.menuItem.title ?? ""}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4 p-4">
            <div>
              <h3 className="line-clamp-1 font-semibold">
                {item.menuItem.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                Rs {item.menuItem.price}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-center gap-3">
              <UniButton
                label="-"
                variant="outline"
                onClick={() => onDecrease(item.id)}
              />

              <span className="min-w-6 text-center font-semibold">
                {item.quantity}
              </span>

              <UniButton
                label="+"
                variant="outline"
                onClick={() => onIncrease(item.id)}
              />
            </div>

            <UniButton
              className="w-full"
              label="Remove"
              variant="destructive"
              onClick={() => onRemove(item.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}