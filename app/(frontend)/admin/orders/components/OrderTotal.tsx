"use client";

import {
  Card,
  CardContent,
} from "@/app/(frontend)/components/ui/card";

import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { Order } from "../types/type";
import { useCurrentUser } from "@/app/(frontend)/components/header/hook/useCurrentUser";
import { useUpdateOrderStatus } from "../../dashboard/hooks/useUpdateOrderStatus";


interface Props {
  order: Order;
}

const statuses = [
  "PENDING",
  "CONFIRMED",
  "COOKING",
  "DELIVERED",
  "CANCELLED",
] as const;

export function OrderTotal({ order }: Props) {
  const { user } = useCurrentUser();

  const updateOrderStatus = useUpdateOrderStatus();

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Order Total
          </p>

          <p className="text-2xl font-bold">
            Rs {order.total.toLocaleString()}
          </p>
        </div>

        {isSuperAdmin ? (
          <MenuItemDropdown
            actions={statuses.map((status) => ({
              label: status,
              onClick: () => {
                updateOrderStatus.mutate({
                  id: order.id,
                  status,
                });
              },
            }))}
          />
        ) : (
          <div className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
            {order.status}
          </div>
        )}
      </CardContent>
    </Card>
  );
}