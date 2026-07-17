"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/(frontend)/components/ui/card";
import { Badge } from "@/app/(frontend)/components/ui/badge";
import { EventPackage } from "../../../admin/events/types/type";

export function Packagedetail({
  packages,
}: {
  packages: EventPackage[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <Card
          key={pkg.id}
          className="overflow-hidden hover:scale-105 transition"
        >
          <CardHeader className="relative h-40 p-0">
            <Image
              src={pkg.package.image}
              alt={pkg.package.name}
              fill
              sizes="(max-width:768px)100vw,33vw"
              className="object-cover"
            />
          </CardHeader>

          <CardContent>
            <h3 className="font-semibold">{pkg.package.name}</h3>
            <p>Rs {pkg.package.finalPrice}</p>
            <p>Quantity: {pkg.quantity}</p>
          </CardContent>

          <CardFooter className="justify-end">
            <Badge>Package</Badge>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}