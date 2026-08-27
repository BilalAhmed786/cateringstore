"use client";

import { useState } from "react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Separator } from "@/app/(frontend)/components/ui/separator";

import {
  NavItem,
  SubNav,
} from "@/app/(frontend)/components/reusables/navitem/navitem";

import { SidebarProps } from "../types/types";

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
  CalendarCheck,
} from "lucide-react";

export default function Sidebar({
  open,
  setOpen,
  onLogout,
}: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } flex h-screen min-h-0 shrink-0 flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between p-6">
        {open && (
          <h1 className="text-xl font-bold text-white">
            Dashboard
          </h1>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="text-slate-400 transition hover:text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <Separator className="shrink-0 bg-slate-800" />

      {/* Navigation */}
      <nav className="min-h-0 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:bg-white p-4 text-slate-300">
        <div className="space-y-2">
          {/* Dashboard */}
          <NavItem
            open={open}
            icon={Home}
            label="Dashboard"
            href="/admin/dashboard"
          />

          {/* Orders */}
          <NavItem
            open={open}
            icon={ShoppingCart}
            label="Orders"
            href="/admin/orders"
          />

          {/* Tasting Inquiries */}
          <NavItem
            open={open}
            icon={CalendarCheck}
            label="Tasting Inquiries"
            href="/admin/tasting"
          />

          {/* Customers */}
          <NavItem
            open={open}
            icon={Users}
            label="Customers"
            href="/admin/customers"
          />

          {/* ================= MENU ================= */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <Layers size={20} />

            {open && (
              <>
                <span className="text-sm font-medium">
                  Menu
                </span>

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
              <SubNav
                label="Menu Items"
                icon={Utensils}
                href="/admin/menu-items"
              />

              <SubNav
                label="Packages"
                icon={Package}
                href="/admin/packages"
              />

              <SubNav
                label="Hampers"
                icon={Gift}
                href="/admin/hampers"
              />

              <SubNav
                label="Events"
                icon={Calendar}
                href="/admin/events"
              />
            </div>
          )}

          {/* ================= CATEGORIES ================= */}
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <Package size={20} />

            {open && (
              <>
                <span className="text-sm font-medium">
                  Categories
                </span>

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
              <SubNav
                label="Food Categories"
                icon={Utensils}
                href="/admin/categories/menu"
              />

              <SubNav
                label="Event Categories"
                icon={Calendar}
                href="/admin/categories/event"
              />

              <SubNav
                label="Hamper Categories"
                icon={Gift}
                href="/admin/categories/hamper"
              />
            </div>
          )}

          {/* Reviews */}
          <NavItem
            open={open}
            icon={Star}
            label="Reviews"
            href="/admin/reviews"
          />

          {/* ================= SETTINGS ================= */}
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <Settings size={20} />

            {open && (
              <>
                <span className="text-sm font-medium">
                  Settings
                </span>

                <ChevronDown
                  size={16}
                  className={`ml-auto transition-transform ${
                    settingsOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {settingsOpen && open && (
            <div className="ml-6 space-y-1">
              <SubNav
                label="Account"
                icon={Users}
                href="/admin/settings/account"
              />

              <SubNav
                label="Store"
                icon={Utensils}
                href="/admin/settings/store"
              />

              <SubNav
                label="Dashboard"
                icon={Settings}
                href="/admin/settings/dashboard"
              />
            </div>
          )}
        </div>
      </nav>

      {/* Bottom separator */}
      <Separator className="shrink-0 bg-slate-800" />

      {/* Logout */}
      <div className="shrink-0 p-4">
        <UniButton
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-red-400"
          icon={<LogOut size={20} />}
          label={open ? "Logout" : ""}
        />
      </div>
    </aside>
  );
}