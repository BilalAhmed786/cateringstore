// app/(frontend)/components/dashboard/DashboardLayout.tsx
"use client"
import React, { useState } from "react"
import Sidebar from "./dashboard/(components)/Sidebar"
import { useLogout } from "./dashboard/hooks/useLogout"
import Header from "./dashboard/(components)/Header"
interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
 const { logout } = useLogout()


  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onLogout={logout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onLogout={logout} />

        {/* Page Content */}
        <main className="overflow-auto">{children}</main>
      </div>
    </div>
  )
}
