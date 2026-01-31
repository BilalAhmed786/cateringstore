"use client"

import React from "react"
import { MenuItem } from "@/app/(frontend)/admin/menu-items/types/menuitem"
import { Badge } from "@/app/(frontend)/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
interface Props {
  items: MenuItem[]
  isLoading: boolean
}

export function MenuItemsGrid({ items, isLoading }: Props) {
  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>
  }

  if (!items.length) {
    return <div className="py-10 text-center">No menu items found</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => {
        const avgRating =
          item.surveys?.length && item.surveys.length > 0
            ? item.surveys.reduce((sum, s) => sum + s.rating, 0) /
              item.surveys.length
            : 0

        return (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Image */}
            <div className="h-40 w-full bg-slate-200 flex items-center justify-center">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover h-full w-full"
                />
              ) : (
                <span className="text-slate-500">No Image</span>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                {item.description && (
                  <p className="text-sm text-slate-500 mt-1">
                    {item.description.length > 60
                      ? item.description.slice(0, 60) + "..."
                      : item.description}
                  </p>
                )}
              </div>

              {/* Price + Status */}
              <div className="flex justify-between items-center mt-3">
                <span className="font-medium">Rs {item.price}</span>
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "Active" : "Inactive"}
                </Badge>
              </div>

              {/* Rating */}
              {item.surveys?.length && item.surveys.length > 0 && (
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.round(avgRating)
                          ? "text-yellow-400"
                          : "text-slate-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-slate-500 ml-2">
                    ({item.surveys.length})
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
