"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, User, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

import Cateringlogo from "../../assets/saif catering.png";

import { Loader } from "../reusables/loader/loader";
import { UniButton } from "../reusables/button/button";

import { useLogout } from "@/app/(frontend)/admin/dashboard/hooks/useLogout";
import { useHeaderScroll } from "./hook/useHeaderScroll";
import { useCurrentUser } from "./hook/useCurrentUser";
import { MobileMenu } from "./components/MobileMenu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/(frontend)/components/ui/dropdown-menu";

import { useNotificationStore } from "../../store/notificationStore";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Menu Items", href: "/menuitem" },
  { name: "Packages", href: "/packages" },
  { name: "Events", href: "/events" },
  { name: "Hampers", href: "/hampers" },
];

const moreItems = [
  { name: "About Us", href: "/aboutus" },
  { name: "Contact Us", href: "/contactus" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { showHeader } = useHeaderScroll();

  const {
    user,
    isLoading: authLoading,
    goToDashboard,
    refreshUser,
  } = useCurrentUser();

  const { logoutAsync, isPending } = useLogout();

  const isLoggedIn = !!user;

  // Notifications
  const notifications = useNotificationStore(
    (state) => state.notifications,
  );

  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications,
  );

  // ---------------------------------------
  // Logout
  // ---------------------------------------

  const handleLogout = async () => {
    try {
      await logoutAsync();
      await refreshUser();
    } catch {
      // useLogout already handles the error/toast
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-background/90 text-foreground shadow-sm backdrop-blur-md transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* ================================================= */}
      {/* HEADER TOP */}
      {/* ================================================= */}

      <div className="flex w-full items-center justify-between px-6 py-3 md:grid md:grid-cols-[auto_1fr_auto] md:px-8">

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <div className="flex w-[65px] shrink-0 items-center">
          <Link href="/">
            <Image
              src={Cateringlogo}
              alt="Catering Logo"
              width={65}
              height={50}
              className="rounded-full object-cover"
            />
          </Link>
        </div>

        {/* ================================================= */}
        {/* DESKTOP NAVIGATION */}
        {/* ================================================= */}

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}

          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-1 transition-colors hover:text-primary focus:outline-none"
              >
                More

                <ChevronDown className="mt-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-40"
            >
              {moreItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                >
                  <Link href={item.href}>
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* ================================================= */}
        {/* DESKTOP RIGHT SIDE */}
        {/* ================================================= */}

        <div className="hidden min-w-[120px] items-center justify-end gap-3 md:flex">

          {/* --------------------------------------------- */}
          {/* Notification */}
          {/* --------------------------------------------- */}

          {isLoggedIn && (
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() =>
                  setNotificationOpen((prev) => !prev)
                }
                className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted focus:outline-none"
              >
                <Bell className="h-4 w-4" />

                {/* Notification count */}
                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* ----------------------------------------- */}
              {/* Notification Dropdown */}
              {/* ----------------------------------------- */}

              {notificationOpen && (
                <div className="absolute right-0 top-11 z-50 w-80 overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-xl">

                  {/* Dropdown Header */}
                  <div className="flex items-center justify-between border-b px-4 py-3">
                    <h3 className="font-semibold">
                      Notifications
                    </h3>

                    {notifications.length > 0 && (
                      <button
                        type="button"
                        onClick={clearNotifications}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* No notifications */}
                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  ) : (
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(
                        (notification) => (
                          <div
                            key={notification.id}
                            className="cursor-pointer border-b px-4 py-3 transition-colors hover:bg-muted"
                          >
                            <p className="font-medium">
                              {notification.title}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {notification.body}
                            </p>

                            {notification.orderId && (
                              <p className="mt-1 text-xs text-muted-foreground/70">
                                Order ID:{" "}
                                {notification.orderId}
                              </p>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* --------------------------------------------- */}
          {/* User */}
          {/* --------------------------------------------- */}

          <div className="flex h-9 w-9 items-center justify-center">
            {authLoading ? (
              <Loader
                variant="inline"
                size={20}
              />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="User menu"
                    className="flex h-8 w-8 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted focus:outline-none"
                  >
                    <User className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-44"
                >
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuItem
                        onClick={goToDashboard}
                        className="cursor-pointer"
                      >
                        Dashboard
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={handleLogout}
                        disabled={isPending}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        {isPending
                          ? "Logging out..."
                          : "Logout"}
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/auth/login">
                          Login
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/auth/register">
                          Register
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* MOBILE MENU BUTTON */}
        {/* ================================================= */}

        <div className="flex w-10 shrink-0 items-center justify-end md:hidden">
          <UniButton
            variant="ghost"
            icon={
              open ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )
            }
            onClick={() =>
              setOpen((prev) => !prev)
            }
            className="h-10 w-10 p-0"
            aria-label={
              open
                ? "Close menu"
                : "Open menu"
            }
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* MOBILE MENU */}
      {/* ================================================= */}

      <MobileMenu
        navItems={[...navItems, ...moreItems]}
        isOpen={open}
        onClose={() => setOpen(false)}
        authLoading={authLoading}
        isLoggedIn={isLoggedIn}
        isPending={isPending}
        onDashboard={goToDashboard}
        onLogout={handleLogout}
      />
    </header>
  );
}