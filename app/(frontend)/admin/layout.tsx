'use client'
import Header from "./dashboard/(components)/Header"
import { useState } from "react"
import Sidebar from "./dashboard/(components)/Sidebar"
import { useLogout } from "./dashboard/hooks/useLogout"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }:DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false) 
  const { logout } = useLogout()

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onLogout={logout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header onLogout={logout} />

        {/* Page Content */}
        <main className="overflow-auto w-full">{children}</main>
      </div>
    </div>
  )
}
