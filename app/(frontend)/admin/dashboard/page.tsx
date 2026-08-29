"use client";

import { useState } from "react";

import StatsGrid from "./(components)/StatsGrid";
import RecentOrders from "./(components)/RecentOrders";

import { useDashboardStats } from "./hooks/useDashboardStats";
import type { duration, StatsPeriod } from "./types/types";
import { formatDashboardStats } from "./(components)/formatDashboardStats";

import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { useGetOrders } from "../orders/hooks/useOrders";
import { useGetStoreSettings } from "../settings/store/hooks/useGetStoreSettings";

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
  const {data} = useGetStoreSettings()
  const ordersQuery = useGetOrders({
    page: 1,
    limit: 5,
    search: "",
    status:""
  });

  const stats = statsQuery.data? formatDashboardStats(statsQuery.data,data?.store.currency): [];

  const orders = ordersQuery.data?.orders ?? [];

  const selectedPeriod =
    periods.find((item) => item.value === period)?.label ??
    "1 Month";

  return (
    <div className="flex min-h-screen bg-slate-950">
      <div className="flex-1 overflow-auto">
        <div className="space-y-8 p-8">

          <div className="flex items-center justify-end gap-3 text-white">
            <span className="text-sm">
              Period:
            </span>

            <MenuItemDropdown
              actions={periods.map((item) => ({
                label: item.label,
                onClick: () => setPeriod(item.value),
              }))}
            />

            <span className="text-sm">
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