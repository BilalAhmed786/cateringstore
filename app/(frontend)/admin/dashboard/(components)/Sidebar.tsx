"use client"

import React, { useState } from "react"
import { UniButton } from "@/app/(frontend)/components/reusables/button/button"
import { Separator } from "@/app/(frontend)/components/ui/separator"
import {NavItem,SubNav} from "@/app/(frontend)/components/reusables/navitem/navitem"

import {
  Home,
  ShoppingCart,
  Users,
  Package,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Utensils,
  Gift,
  Calendar,
  Layers,
  Star,
} from "lucide-react"
import type { SidebarProps } from "../types/types"

export default function Sidebar({ open, setOpen, onLogout }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <aside
      className={`${open ? "w-64" : "w-20"} bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        {open && <h1 className="text-xl font-bold text-white">Dashboard</h1>}
        <button onClick={() => setOpen(!open)} className="text-slate-400 hover:text-white">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <Separator className="bg-slate-800" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 text-slate-300">

        <NavItem open={open} icon={Home} label="Dashboard" href="dashboard" />
        <NavItem open={open} icon={ShoppingCart} label="Orders" href="orders" />

        {/* Customers */}
        <NavItem open={open} icon={Users} label="Customers" href="customers" />

        {/* MENU DROPDOWN */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full flex items-start gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
        >
          <Layers size={20} />
          {open && (
            <>
              <span className="text-sm font-medium">Menu</span>
              <ChevronDown
                size={16}
                className={`transition-transform mt-1 ${menuOpen ? "rotate-180" : ""}`}
              />
            </>
          )}
        </button>

        {menuOpen && open && (
          <div className="ml-6 space-y-1">
            <SubNav label="Menu Items" icon={Utensils} href="menu-items" />
            <SubNav label="Categories" icon={Package} href="/dashboard/categories" />
            <SubNav label="Packages" icon={Gift} href="/dashboard/packages" />
            <SubNav label="Hampers" icon={Gift} href="/dashboard/hampers" />
            <SubNav label="Events" icon={Calendar} href="/dashboard/events" />
          </div>
        )}

        {/* Surveys */}
        <NavItem open={open} icon={Star} label="Surveys" href="/dashboard/surveys" />

        {/* Settings */}
        <NavItem open={open} icon={Settings} label="Settings" href="/dashboard/settings" />
      </nav>

      <Separator className="bg-slate-800" />

      {/* Logout */}
      <div className="p-4">
        <UniButton
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-red-400 hover:bg-slate-800"
          icon={<LogOut size={20} />}
          label={open ? "Logout" : ""}
        />
      </div>
    </aside>
  )
}




