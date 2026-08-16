"use client";

import React from "react";
import { Card } from "@/app/(frontend)/components/ui/card";
import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";

import type { OrderStatus, RecentOrdersProps } from "../types/types";
import { useUpdateOrderStatus } from "../hooks/useUpdateOrderStatus";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";




const statuses: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "COOKING",
  "DELIVERED",
  "CANCELLED",
];


export default function RecentOrders({
  orders
}: RecentOrdersProps) {

  const updateOrderStatus = useUpdateOrderStatus();

  if(orders.length === 0) return <Loader/>

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <h2 className="p-6 text-xl font-semibol text-white">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
                Order ID
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
                Customer
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
                Amount
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
                Status
              </th>

              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders?.map((order, i) => (
              <tr
                key={i}
                className="border-b border-slate-700 hover:bg-slate-700/30 transition-all"
              >
                <td className="px-6 py-4 text-sm text-white">
                  {order.id}
                </td>

                <td className="px-6 py-4 text-sm text-slate-300">
                  {order.guestName}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-white">
                  {order.total}
                </td>

                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "DELIVERED"
                        ? "bg-green-500/20 text-green-300"
                        : order.status === "COOKING"
                          ? "bg-blue-500/20 text-blue-300"
                          : order.status === "CONFIRMED"
                            ? "bg-purple-500/20 text-purple-300"
                            : order.status === "CANCELLED"
                              ? "bg-red-500/20 text-red-300"
                              : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-white bg-transparent outline-0 border-0">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}