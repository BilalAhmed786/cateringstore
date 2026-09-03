"use client";

import {
  CalendarDays,
  CreditCard,
  Package,
  ShoppingBag,
} from "lucide-react";

import { Card, CardContent } from "@/app/(frontend)/components/ui/card";
import { Order } from "../types/type";

interface Props {
  order: Order;
}

export function OrderSummaryCards({ order }: Props) {
  return (
    <div className="grid min-w-0 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        icon={<ShoppingBag className="h-5 w-5" />}
        label="Order ID"
        value={order.id}
      />

      <SummaryCard
        icon={<CalendarDays className="h-5 w-5" />}
        label="Order Date"
        value={new Date(order.createdAt).toLocaleDateString()}
      />

      <SummaryCard
        icon={<CreditCard className="h-5 w-5" />}
        label="Payment"
        value={order.paymentIntentId ? "Paid" : "Not Paid"}
      />

      <SummaryCard
        icon={<Package className="h-5 w-5" />}
        label="Status"
        value={order.status}
      />
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SummaryCard({
  icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <Card className="min-w-0">
      <CardContent className="min-w-0 p-5">
        <div className="mb-2 flex min-w-0 items-center gap-2 text-muted-foreground">
          {icon}

          <span className="text-sm">
            {label}
          </span>
        </div>

        <p
          className="min-w-0 truncate font-medium"
          title={value}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}