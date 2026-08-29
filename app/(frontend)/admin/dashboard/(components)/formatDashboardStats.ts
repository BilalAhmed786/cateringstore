"use client"
import {
  ShoppingCart,
  Users,
  TrendingUp,
  BarChart3,
} from "lucide-react";

import type {
  DashboardStats,
  StatItem,
} from "../types/types";
export function formatDashboardStats(
  stats: DashboardStats,
  currency?:string
  
): StatItem[] {

   
  return [
    {
      label: "Total Orders",
      value: stats.totalOrders.value.toLocaleString(),
      trend: `${stats.totalOrders.trend >= 0 ? "+" : ""}${stats.totalOrders.trend.toFixed(1)}%`,
      icon: ShoppingCart,
    },

    {
      label: "Total Users",
      value: stats.totalUsers.value.toLocaleString(),
      trend: `${stats.totalUsers.trend >= 0 ? "+" : ""}${stats.totalUsers.trend.toFixed(1)}%`,
      icon: Users,
    },

    {
      label: "Revenue",
      value: `${currency} ${stats.revenue.value.toLocaleString()}`,
      trend: `${stats.revenue.trend >= 0 ? "+" : ""}${stats.revenue.trend.toFixed(1)}%`,
      icon: TrendingUp,
    },

    {
      label: "Delivered Orders",
      value: stats.deliveredOrders.value.toLocaleString(),
      trend: `${stats.deliveredOrders.trend >= 0 ? "+" : ""}${stats.deliveredOrders.trend.toFixed(1)}%`,
      icon: BarChart3,
    },
  ];
}