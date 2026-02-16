"use client";
import Image from "next/image";
import { Badge } from "@/app/(frontend)/components/ui/badge";
import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { RatingSummary } from "../ratingsummary/ratingsummary";
import { EntityGridProps } from "./gridtypes";

export function EntityGrid({
  items,
  isLoading,
  selectable = false,
  onSelect,
  renderPrice,
  renderMeta,
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
        <div
          key={item.id}
          className="relative flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md cursor-pointer"
          onClick={() => onSelect?.(item)}
        >
          {/* Dropdown */}
          {selectable && actions && actions(item).length > 0 && (
            <div className="absolute top-2 right-2 z-10">
              <MenuItemDropdown actions={actions(item)} />
            </div>
          )}

          {/* Image */}
          <div className="h-40 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
            {item.images?.[0]?.url ? (
              <Image
                src={item.images[0].url}
                alt={item.title}
                width={400}
                height={160}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm text-slate-400">No Image</span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <h2 className="line-clamp-1 text-lg font-semibold">
                {item.title}
              </h2>

              {/* ⭐ Rating / Meta */}
              {renderMeta ? (
                renderMeta(item)
              ) : (
                <div className="mt-1">
                  <RatingSummary
                    rating={item.averageRating ?? 0}
                    count={item.totalReviews ?? 0}
                  />
                </div>
              )}
            </div>

            {/* Price & Status */}
            <div className="mt-4 flex items-center justify-between">
              {renderPrice ? (
                renderPrice(item)
              ) : (
                <span className="font-medium text-gray-800">
                  Rs {item.price}
                </span>
              )}

              {item.available !== undefined && (
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "Active" : "Inactive"}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
