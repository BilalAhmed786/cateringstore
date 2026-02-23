"use client";

import Image from "next/image";
import { Badge } from "@/app/(frontend)/components/ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "@/app/(frontend)/components/ui/card";
import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { RatingSummary } from "../ratingsummary/ratingsummary";
import { EntityGridProps } from "./gridtypes";

export function EntityGrid({
  items,
  isLoading,
  selectable = false,
  onSelect,
  actions,
}: EntityGridProps) {
  if (isLoading) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        Loading items...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        No items found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="relative cursor-pointer overflow-hidden transform transition hover:scale-105 hover:shadow-lg duration-300"
          onClick={() => onSelect?.(item)}
        >
          {/* Dropdown */}
          {selectable && actions && actions(item).length > 0 && (
            <div className="absolute top-2 right-2 z-10">
              <MenuItemDropdown actions={actions(item)} />
            </div>
          )}

          {/* Image */}
          <CardHeader className="relative h-40 bg-black rounded-t-xl overflow-hidden">
            {item.images?.[0]?.url ? (
              <Image
                src={item.images[0].url}
                alt={item.title ?? item.name ?? "Item"}
                fill
                className="object-cover rounded-t-xl"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-black rounded-t-xl">
                <span className="text-sm text-gray-300">No Image</span>
              </div>
            )}
          </CardHeader>

          {/* Content */}
          <CardContent className="flex flex-col justify-between p-4 gap-2">
            <div>
              <h2 className="line-clamp-1 text-lg font-semibold">
                {item.title ?? item.name}
              </h2>

              <div className="mt-1">
                <RatingSummary
                  rating={item.averageRating ?? 0}
                  count={item.totalReviews ?? 0}
                />
              </div>
            </div>

            <CardFooter className="mt-4 flex items-center justify-between p-0">
              {"price" in item && (
                <span className="font-medium text-gray-800">Rs {item.price}</span>
              )}

              {"finalPrice" in item && (
                <div className="flex flex-col text-right">
                  {item.originalPrice ? (
                    <>
                      <span className="text-xs line-through text-gray-400">
                        Rs {item.originalPrice}
                      </span>
                      <span className="font-semibold text-green-600">
                        Rs {item.finalPrice}
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold">Rs {item.finalPrice}</span>
                  )}
                </div>
              )}

              {item.available !== undefined && (
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "Active" : "Inactive"}
                </Badge>
              )}
            </CardFooter>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}