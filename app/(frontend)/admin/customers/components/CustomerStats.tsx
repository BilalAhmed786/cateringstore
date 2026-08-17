"use client";

import { ShoppingBag } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";

interface Props {
  totalOrders: number;
}

export function CustomerStats({
  totalOrders,
}: Props) {
  return (
    <Card className="p-5">
      <CardHeader>
        <CardTitle>
          Customer Statistics
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-muted-foreground" />

          <div>
            <p className="text-sm text-muted-foreground">
              Total Orders
            </p>

            <p className="text-2xl font-bold">
              {totalOrders}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}