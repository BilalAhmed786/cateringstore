"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/app/(frontend)/components/ui/card";
import { Badge } from "@/app/(frontend)/components/ui/badge";
import { PackageMenuItem } from "../../../admin/packages/types/type";
import { HampereMenuItem } from "../../../admin/hampers/types/type";
import { useGetStoreSettings } from "@/app/(frontend)/admin/settings/store/hooks/useGetStoreSettings";



export function Menuitemdetail({ items }: { items:PackageMenuItem[] | HampereMenuItem[]} ) {
const {data} = useGetStoreSettings()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items?.map((item,index) => {
        const image = item.menuItem.images?.[0]?.url;

        return (
          <Card
            key={item.id}
            className="overflow-hidden transform transition hover:scale-105 hover:shadow-lg duration-300 animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Card Header */}
            <CardHeader className="relative p-0 h-40 w-full">
              {image ? (
                <>
                  <div className="absolute inset-0 bg-black/30 z-10 rounded-t-lg" />
                  <Image
                    src={image}
                    alt={item.menuItem.title??""}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-black/20 rounded-t-lg">
                  <span className="text-sm text-gray-200">No Image</span>
                </div>
              )}
            </CardHeader>

            {/* Card Content */}
            <CardContent className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold line-clamp-1">{item.menuItem.title}</h3>
              <p className="text-gray-600 font-medium">{data?.store.currency} {item.menuItem.price}</p>
              <p className="text-gray-500 text-sm">
                Quantity: <strong>{item.quantity}</strong>
              </p>
            </CardContent>

            {/* Card Footer */}
            <CardFooter className="flex justify-end p-2">
              <Badge variant="secondary">Menu Item</Badge>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}