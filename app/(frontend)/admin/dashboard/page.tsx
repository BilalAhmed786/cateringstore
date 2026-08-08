"use client";

import { useState } from "react";

import StatsGrid from "./(components)/StatsGrid";
import RecentOrders from "./(components)/RecentOrders";

import { useDashboardStats } from "./hooks/useDashboardStats";
import { useRecentOrders } from "./hooks/useRecentOrders";

import type { duration, StatsPeriod } from "./types/types";

import { formatDashboardStats } from "./(components)/formatDashboardStats";

import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";

const periods:duration[] = [
  {
    label: "1 Month",
    value: "1m",
  },
  {
    label: "3 Months",
    value: "3m",
  },
  {
    label: "6 Months",
    value: "6m",
  },
  {
    label: "1 Year",
    value: "1y",
  },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState<StatsPeriod>("1m");

  const statsQuery = useDashboardStats(period);
  const ordersQuery = useRecentOrders();

  const stats = statsQuery.data
    ? formatDashboardStats(statsQuery.data)
    : [];

  const orders = ordersQuery.data ?? [];
  const selectedPeriod =  periods.find((item) => item.value === period)?.label ?? "1 Month";

  return (
    <div className="flex min-h-screen bg-slate-950">
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">

          {/* Period Dropdown */}
          <div className="flex justify-end items-center gap-3 text-white">
            <span className="text-sm text-white">
              Period:
            </span>

            <MenuItemDropdown
              actions={periods.map((item) => ({
                label: item.label,
                onClick: () => setPeriod(item.value),
              }))}
      
            />
            
            <span className="text-sm text-white">
              {selectedPeriod}
            </span>
          </div>

          <StatsGrid stats={stats} />

          <RecentOrders orders={orders} />

        </div>
      </div>
    </div>
  );
}