"use client"
import React, { useState } from "react"
import Sidebar from "./(components)/Sidebar"
import Header from "./(components)/Header"
import StatsGrid from "./(components)/StatsGrid"
import RecentOrders from "./(components)/RecentOrders"
import { useLogout } from "./hooks/useLogout"
import { useDashboardStats } from "./hooks/useDashboardStats"
import { useRecentOrders } from "./hooks/useRecentOrders"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { logout } = useLogout()
  const onLogout = () => logout?.()

  const statsQuery = useDashboardStats()
  const ordersQuery = useRecentOrders()

  const stats = statsQuery.data ?? []
  const orders = ordersQuery.data ?? []

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onLogout={onLogout} />
      <div className="flex-1 overflow-auto">
        <Header onLogout={onLogout} />
        <div className="p-8 space-y-8">
          <StatsGrid stats={stats} />
          <RecentOrders orders={orders} />
        </div>
      </div>
    </div>
  )
}
