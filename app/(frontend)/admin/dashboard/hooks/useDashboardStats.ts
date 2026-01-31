"use client"

import { useQuery } from "@tanstack/react-query"
import type { StatItem } from "../types/types"
import { ShoppingCart, Users, TrendingUp, BarChart3 } from "lucide-react"

export function useDashboardStats() {
  return useQuery<StatItem[]>({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      return [
        { label: "Total Orders", value: "1,234", trend: "+12.5%", icon: ShoppingCart },
        { label: "Total Users", value: "856", trend: "+8.2%", icon: Users },
        { label: "Revenue", value: "$45,231", trend: "+23.1%", icon: TrendingUp },
        { label: "Analytics", value: "92%", trend: "+5.4%", icon: BarChart3 },
      ]
    },
    staleTime: 60_000,
  })
}
