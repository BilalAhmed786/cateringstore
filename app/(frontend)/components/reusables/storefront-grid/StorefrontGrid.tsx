"use client";

import { ProductCard } from "./ProductCard";
import { StorefrontGridProps } from "./gridtypes";

export function StorefrontGrid({
  items,
  isLoading,
  onItemClick,
}: StorefrontGridProps) {
  if (isLoading) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Loading menu items...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No menu items found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          onClick={() => onItemClick?.(item)}
        />
      ))}
    </div>
  );
}