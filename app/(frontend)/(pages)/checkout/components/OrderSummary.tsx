"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";

import { Separator } from "@/app/(frontend)/components/ui/separator";

import { useCartStore } from "@/app/(frontend)/store/useCartStore";

export function OrderSummary() {
  const { items } = useCartStore();

  const total = items.reduce(
    (sum, item) =>
      sum + (item.finalPrice ?? 0) * item.quantity,
    0,
  );

  return (
    <Card className="lg:sticky lg:top-24 p-4 lg:h-[calc(100vh-120px)] flex flex-col">

      <CardHeader>
        <CardTitle>
          Order Summary
        </CardTitle>
      </CardHeader>


      <CardContent className="flex flex-1 flex-col overflow-hidden">

        {/* Scrollable Items */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">

          {items.map((item) => {

            const title = item.title ?? item.name;

            const price =
              item.price ??
              item.finalPrice ??
              0;


            return (

              <div
                key={item.id}
                className="space-y-3"
              >

                {/* Main Item */}

                <div className="flex gap-4">

                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">

                    <Image
                      src={
                        item.image ??
                        item.images?.[0]?.url ??
                        ""
                      }
                      alt={title ?? ""}
                      fill
                      className="object-cover"
                    />

                  </div>


                  <div>

                    <h3 className="font-semibold">
                      {title}
                    </h3>


                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>


                    <p>
                      ${price}
                    </p>


                    <p className="font-medium">
                      Subtotal: ${(price * item.quantity).toFixed(2)}
                    </p>

                  </div>

                </div>

                {item.selectedItems && item.selectedItems?.length > 0 && (

                  <div className="rounded-md bg-muted p-3">

                    <p className="mb-2 font-medium">
                      Includes:
                    </p>


                    <ul className="space-y-1 text-sm">

                      {item.selectedItems && item.selectedItems.map((included) => (

                        <li key={included.id}>
                          • {included.menuItem.title}
                          {included.quantity &&
                            ` (x${included.quantity})`}
                        </li>

                      ))}

                    </ul>

                  </div>

                )}



                {/* Event Menu Items */}

                {item.menuItems && item.menuItems?.length > 0 && (

                  <div className="rounded-md bg-muted p-3">

                    <p className="mb-2 font-medium">
                      Includes Menu Items:
                    </p>


                    <ul className="space-y-1 text-sm">

                      {item.menuItems.map((included) => (

                        <li key={included.id}>
                          • {included.menuItem.title}
                          {included.quantity &&
                            ` (x${included.quantity})`}
                        </li>

                      ))}

                    </ul>

                  </div>

                )}



                {/* Event Packages */}

                {item.packages && item.packages.length > 0 && (

                  <div className="rounded-md bg-muted p-3">

                    <p className="mb-2 font-medium">
                      Includes Packages:
                    </p>


                    <ul className="space-y-1 text-sm">

                      {item.packages.map((included) => (

                        <li key={included.id}>
                          • {included.package.name}
                        </li>

                      ))}

                    </ul>

                  </div>

                )}


                <Separator />

              </div>

            );
          })}

        </div>


        {/* Fixed Total Area */}

        <div className="pt-4">

          <Separator className="mb-4" />


          <div className="flex justify-between text-lg font-bold">

            <span>
              Total
            </span>


            <span>
              ${total.toFixed(2)}
            </span>

          </div>

        </div>


      </CardContent>

    </Card>
  );
}