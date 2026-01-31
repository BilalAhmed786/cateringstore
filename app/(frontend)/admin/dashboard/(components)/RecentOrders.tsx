"use client"

import React from "react"
import { Card } from "@/app/(frontend)/components/ui/card"
import { ShoppingCart, MoreVertical } from "lucide-react"
import type { RecentOrdersProps } from "../types/types"

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <div className="p-6 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <ShoppingCart size={20} />
          Recent Orders
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-b border-slate-700 hover:bg-slate-700/30 transition-all">
                <td className="px-6 py-4 text-sm text-white">{order.id}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{order.customer}</td>
                <td className="px-6 py-4 text-sm font-medium text-white">{order.amount}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "Delivered" ? "bg-green-500/20 text-green-300" :
                    order.status === "Processing" ? "bg-blue-500/20 text-blue-300" : "bg-yellow-500/20 text-yellow-300"
                  }`}>{order.status}</span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-slate-400 hover:text-white transition-all">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
