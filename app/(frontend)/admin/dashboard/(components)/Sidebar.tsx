"use client"

import React from "react"
import { UniButton } from "@/app/(frontend)/components/reusables/button/button"
import { Separator } from "@/app/(frontend)/components/ui/separator"
import { Home, ShoppingCart, Users, Package, Settings, Menu, X, LogOut } from "lucide-react"
import type { SidebarProps } from "../../types/types"

export default function Sidebar({ open, setOpen, onLogout }: SidebarProps) {
  const nav = [
    { icon: Home, label: "Dashboard" },
    { icon: ShoppingCart, label: "Orders" },
    { icon: Users, label: "Customers" },
    { icon: Package, label: "Products" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <aside className={`${open ? "w-64" : "w-20"} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}>
      <div className="p-6 flex items-center justify-between">
        {open && <h1 className="text-xl font-bold text-white">Dashboard</h1>}
        <button onClick={() => setOpen(!open)} className="text-slate-400 hover:text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <Separator className="bg-slate-800" />

      <nav className="flex-1 p-4 space-y-2">
        {nav.map((item) => (
          <button key={item.label} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
            <item.icon size={20} />
            {open && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <Separator className="bg-slate-800" />

      <div className="p-4">
        <UniButton onClick={onLogout} variant="ghost" className="w-full justify-start text-slate-300 hover:text-red-400 hover:bg-slate-800" icon={<LogOut size={20} />} label={open ? "Logout" : ""} />
      </div>
    </aside>
  )
}
