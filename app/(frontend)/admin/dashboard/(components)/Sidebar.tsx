"use client";

import { useState } from "react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Separator } from "@/app/(frontend)/components/ui/separator";

import {
  NavItem,
  SubNav,
} from "@/app/(frontend)/components/reusables/navitem/navitem";

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

import { useDashboardSettingsStore } from "@/app/(frontend)/store/dashboardSettingsStore";


interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  onLogout: () => void;
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  onLogout,
}: SidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const sidebar = useDashboardSettingsStore(
    (state) => state.sidebar,
  );

  const setSidebar = useDashboardSettingsStore(
    (state) => state.setSidebar,
  );
  const desktopExpanded = sidebar === "expanded";
  
  const toggleDesktopSidebar = () => {
    setSidebar(
      desktopExpanded ? "collapsed" : "expanded",
    );
  };

 
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-screen flex-col
          overflow-hidden
          border-r border-slate-800
          bg-slate-900
          text-slate-300
          transition-all duration-300

          ${mobileOpen ? "w-64" : "w-0"}

          md:relative
          md:z-auto
          ${
            desktopExpanded
              ? "md:w-64"
              : "md:w-20"
          }
        `}
      >
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-4">
          {desktopExpanded && (
            <h1 className="text-xl font-bold">
              Dashboard
            </h1>
          )}

          {/* Desktop collapse button */}
          <button
            type="button"
            onClick={toggleDesktopSidebar}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white md:flex"
          >
            {desktopExpanded ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => {setMobileOpen(false); setSidebar("collapsed") }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <Separator className="shrink-0 bg-slate-800" />

        {/* Navigation */}
        <nav className="min-h-0 flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-2 [scrollbar-gutter:stable]">
          <div className="space-y-2">

            <NavItem
              open={desktopExpanded}
              icon={Home}
              label="Dashboard"
              href="/admin/dashboard"
            />

            <NavItem
              open={desktopExpanded}
              icon={ShoppingCart}
              label="Orders"
              href="/admin/orders"
            />

            <NavItem
              open={desktopExpanded}
              icon={CalendarCheck}
              label="Tasting Inquiries"
              href="/admin/tasting"
            />

            <NavItem
              open={desktopExpanded}
              icon={Users}
              label="Customers"
              href="/admin/customers"
            />

            {/* Menu */}
            <button
              type="button"
              onClick={() =>
                setMenuOpen((previous) => !previous)
              }
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-slate-800 hover:text-white"
            >
              <Layers size={20} />

              {desktopExpanded && (
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

            {menuOpen && desktopExpanded && (
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

            {/* Categories */}
            <button
              type="button"
              onClick={() =>
                setCategoryOpen((previous) => !previous)
              }
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <Package size={20} />

              {desktopExpanded && (
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

            {categoryOpen && desktopExpanded && (
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

            <NavItem
              open={desktopExpanded}
              icon={Star}
              label="Reviews"
              href="/admin/reviews"
            />

            {/* Settings */}
            <button
              type="button"
              onClick={() =>
                setSettingsOpen((previous) => !previous)
              }
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <Settings size={20} />

              {desktopExpanded && (
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

            {settingsOpen && desktopExpanded && (
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
                  label="Application"
                  icon={Settings}
                  href="/admin/settings/Application"
                />
              </div>
            )}
          </div>
        </nav>

        <Separator className="shrink-0 bg-slate-800" />

        {/* Logout */}
        <div className="shrink-0 p-4">
          <UniButton
            onClick={onLogout}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-red-400"
            icon={<LogOut size={20} />}
            label={desktopExpanded ? "Logout" : ""}
          />
        </div>
      </aside>
    </>
  );
}