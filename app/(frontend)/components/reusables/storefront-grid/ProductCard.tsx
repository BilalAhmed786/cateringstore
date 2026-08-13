"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Card, CardContent } from "@/app/(frontend)/components/ui/card";
import { Badge } from "@/app/(frontend)/components/ui/badge";
import { RatingSummary } from "../ratingsummary/ratingsummary";
import { QuantitySelector } from "./QuantitySelector";
import { UniButton } from "../button/button";
import { useCartStore } from "@/app/(frontend)/store/useCartStore";
import { ProductCardProps } from "./types";

export function ProductCard({
  item,
  type,
  onClick,
  renderSubtitle,
  renderActions,
}: ProductCardProps) {
  const { items, addItem, increase, decrease } = useCartStore();

  const cartItem = items.find((i) => i.id === item.id);

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-xl transition hover:shadow-xl"
    >
      <div className="relative h-52">
        <Image
          src={item.images?.[0]?.url ?? item.image ?? "/placeholder.png"}
          alt={item.title ?? item.name ?? ""}
          fill
          className="object-cover"
        />

        {!item.available && (
          <Badge
            variant="secondary"
            className="absolute left-3 top-3"
          >
            Out of Stock
          </Badge>
        )}
      </div>

      <CardContent className="space-y-3 p-5">
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">
            {item.title ?? item.name}
          </h3>

          {renderSubtitle ? (
            <div className="mt-1 text-sm text-muted-foreground">
              {renderSubtitle(item)}
            </div>
          ) : (
            item.description && (
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            )
          )}

          <div className="mt-2">
            <RatingSummary
              rating={item.averageRating ?? 0}
              count={item.totalReviews ?? 0}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            Rs {item.price ?? item.finalPrice}
          </span>

          <div onClick={(e) => e.stopPropagation()}>
            {renderActions ? (
              renderActions(item)
            ) : cartItem ? (
              <QuantitySelector
                quantity={cartItem.quantity}
                onIncrease={() => increase(item.id)}
                onDecrease={() => decrease(item.id)}
              />
            ) : (
              <UniButton
                label="Add To Cart"
                icon={<ShoppingCart className="h-4 w-4" />}
                onClick={() => addItem(item,type)}
                disabled={!item.available}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}