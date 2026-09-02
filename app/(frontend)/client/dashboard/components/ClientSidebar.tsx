"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Star,
  Utensils,
  LogOut,
  Settings,
  UserRound,
  SlidersHorizontal,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/client/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Orders",
    href: "/client/orders",
    icon: ShoppingBag,
  },
  {
    label: "Reviews",
    href: "/client/reviews",
    icon: Star,
  },
  {
    label: "Tasting Requests",
    href: "/client/tasting",
    icon: Utensils,
  },
];

export default function ClientSidebar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(
    pathname.startsWith("/client/settings"),
  );

  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-background p-2 shadow-sm md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r bg-background
          transition-transform duration-300
          md:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link
            href="/"
            onClick={closeMobileSidebar}
            className="text-xl font-bold"
          >
            Saif Catering
          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={closeMobileSidebar}
            className="rounded-lg p-2 hover:bg-muted md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileSidebar}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />

                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Settings */}
          <div>
            <button
              type="button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                pathname.startsWith("/client/settings")
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />

                <span>Settings</span>
              </div>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  settingsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Settings Children */}
            {settingsOpen && (
              <div className="mt-1 space-y-1 pl-4">
                <Link
                  href="/client/settings/account"
                  onClick={closeMobileSidebar}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                    pathname.startsWith(
                      "/client/settings/account",
                    )
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <UserRound className="h-4 w-4" />

                  <span>Account Settings</span>
                </Link>

                <Link
                  href="/client/settings/application"
                  onClick={closeMobileSidebar}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                    pathname.startsWith(
                      "/client/settings/application",
                    )
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <SlidersHorizontal className="h-4 w-4" />

                  <span>Application Settings</span>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}