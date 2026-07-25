"use client";

import Image from "next/image";
import { Button } from "@/app/(frontend)/components/ui/button";
import { Star } from "lucide-react";
import { PackageCardProps } from "../types/type";


export function PackageCard({
  item,
  onClick,
  onAddToCart,
  onCustomize,
}: PackageCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm transition hover:shadow-lg">
      <div
        className="cursor-pointer"
        onClick={onClick}
      >
        <div className="relative aspect-square">
          <Image
            src={item.image || "/placeholder.png"}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-3 p-4">
          <h3 className="text-lg font-semibold">{item.name}</h3>

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{item.averageRating.toFixed(1)}</span>
          </div>

          <div>
            <p className="text-xl font-bold">
              Rs. {item.finalPrice}
            </p>

            {item.originalPrice !== item.finalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                Rs. {item.originalPrice}
              </p>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {item.items.length} Menu Items Included
          </p>
        </div>
      </div>

      <div className="flex gap-2 p-4 pt-0">
        <Button
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
        >
          Add To Cart
        </Button>

        <Button
          variant="outline"
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            onCustomize();
          }}
        >
          Customize
        </Button>
      </div>
    </div>
  );
}