"use client";

import StatsGrid from "./(components)/StatsGrid";
import RecentOrders from "./(components)/RecentOrders";

import { useDashboardStats } from "./hooks/useDashboardStats";
import { useRecentOrders } from "./hooks/useRecentOrders";

export default function AdminDashboard() {
  const statsQuery = useDashboardStats();
  const ordersQuery = useRecentOrders();

  const stats = statsQuery.data ?? [];
  const orders = ordersQuery.data ?? [];

  return (
    <div className="flex min-h-screen bg-slate-950">
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-8">
          <StatsGrid stats={stats} />
          <RecentOrders orders={orders} />
        </div>
      </div>
    </div>
  );
}
