"use client";

import { ProductCard } from "./ProductCard";
import { StorefrontGridProps } from "./gridtypes";
import { motion } from "framer-motion";
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
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration:2 }}
        >
          <ProductCard item={item} onClick={() => onItemClick?.(item)} />
        </motion.div>
      ))}
    </div>
  );
}
