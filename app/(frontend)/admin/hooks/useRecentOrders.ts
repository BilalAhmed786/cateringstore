"use client"

import { useQuery } from "@tanstack/react-query"
import type { Order } from "../types/types"

export function useRecentOrders() {
  return useQuery<Order[]>({
    queryKey: ["dashboard", "recentOrders"],
    queryFn: async () => {
      return [
        { id: "#2024001", customer: "John Doe", amount: "$350.00", status: "Delivered" },
        { id: "#2024002", customer: "Jane Smith", amount: "$125.50", status: "Processing" },
        { id: "#2024003", customer: "Bob Johnson", amount: "$89.99", status: "Pending" },
      ]
    },
    staleTime: 30_000,
  })
}
