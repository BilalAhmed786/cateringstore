"use client"

import React, { useState } from "react"
import { UniButton } from "@/app/(frontend)/components/reusables/button/button"
import { Separator } from "@/app/(frontend)/components/ui/separator"
import { NavItem, SubNav } from "@/app/(frontend)/components/reusables/navitem/navitem"
import { SidebarProps } from "../types/types"

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

export default function Sidebar({ open, setOpen, onLogout }: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        {open && <h1 className="text-xl font-bold text-white">Dashboard</h1>}
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-400 hover:text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <Separator className="bg-slate-800" />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 text-slate-300">
        <NavItem open={open} icon={Home} label="Dashboard" href="/admin/dashboard" />
        <NavItem open={open} icon={ShoppingCart} label="Orders" href="/admin/orders" />
        <NavItem open={open} icon={Users} label="Customers" href="/admin/customers" />

        {/* MENU DROPDOWN */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Layers size={20} />
          {open && (
            <>
              <span className="text-sm font-medium">Menu</span>
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>

        {menuOpen && open && (
          <div className="ml-6 space-y-1">
            <SubNav label="Menu Items" icon={Utensils} href="/admin/menu-items" />
            <SubNav label="Packages" icon={Package} href="/admin/packages" />
            <SubNav label="Hampers" icon={Gift} href="/admin/hampers" />
            <SubNav label="Events" icon={Calendar} href="/admin/events" />
          </div>
        )}

        {/* CATEGORIES DROPDOWN */}
        <button
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Package size={20} />
          {open && (
            <>
              <span className="text-sm font-medium">Categories</span>
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>

        {categoryOpen && open && (
          <div className="ml-6 space-y-1">
            <SubNav label="Food Categories" icon={Utensils} href="/admin/categories/menu" />
            <SubNav label="Event Categories" icon={Calendar} href="/admin/categories/events" />
            <SubNav label="Hamper Categories" icon={Gift} href="/admin/categories/hampers" />
          </div>
        )}

        <NavItem open={open} icon={Star} label="Surveys" href="/admin/surveys" />
        <NavItem open={open} icon={Settings} label="Settings" href="/admin/settings" />
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