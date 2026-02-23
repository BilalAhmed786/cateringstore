"use client";

import Image from "next/image";
import { MenuItemDetailProps } from "../types/type";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/(frontend)/components/ui/card";
import { Badge } from "@/app/(frontend)/components/ui/badge";

export function Menuitemdetail({ items }: MenuItemDetailProps) {
  if (!items.length) {
    return <div className="p-6 text-center text-gray-500">No menu items</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const image = item.menuItem.images?.[0]?.url;

        return (
          <Card
            key={item.id}
            className="overflow-hidden transform transition hover:scale-105 hover:shadow-lg duration-300 animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Card Header with Image */}
            <CardHeader className="p-0 h-40 bg-slate-100 flex items-center justify-center">
              {image ? (
                <Image
                  src={image}
                  alt={item.menuItem.title}
                  width={400}
                  height={160}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-slate-400">No Image</span>
              )}
            </CardHeader>

            {/* Card Content */}
            <CardContent className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold line-clamp-1">
                {item.menuItem.title}
              </h3>

              <p className="text-gray-600 font-medium">Rs {item.menuItem.price}</p>
              <p className="text-gray-500 text-sm">
                Quantity: <strong>{item.quantity}</strong>
              </p>
            </CardContent>

            {/* Optional Footer with Badge */}
            <CardFooter className="flex justify-end p-2">
              <Badge variant="secondary">Menu Item</Badge>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}