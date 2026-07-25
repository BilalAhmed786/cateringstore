"use client";

import Image from "next/image";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { MenuItem } from "@/app/(frontend)/admin/packages/types/type";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";


interface SelectedPackageItemsProps {
  items: (MenuItem | GridItem)[];
  onRemove: (id: string) => void;
}

export function SelectedPackageItems({
  items,
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
              src={item.images?.[0]?.url ?? "/placeholder.png"}
              alt={item.title ?? ""}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-3 p-4">
            <div>
              <h3 className="line-clamp-1 font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                Rs {item.price}
              </p>
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