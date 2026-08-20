"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  User,
  Bell,
} from "lucide-react";
import Image from "next/image";

import Cateringlogo from "../../assets/saif catering.png";

import { Loader } from "../reusables/loader/loader";
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

const navItems = [
  { name: "Home", href: "/" },
  { name: "Menu Items", href: "/menuitem" },
  { name: "Packages", href: "/packages" },
  { name: "Events", href: "/events" },
  { name: "Hampers", href: "/hampers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const { showHeader } = useHeaderScroll();

  const {
    user,
    isLoading: authLoading,
    goToDashboard,
    refreshUser,
  } = useCurrentUser();

  const {
    logoutAsync,
    isPending,
  } = useLogout();

  const isLoggedIn = !!user;

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
      className={`fixed inset-x-0 top-0 z-40 border-b bg-white/90 shadow-sm backdrop-blur-md transition-transform duration-300 ${
        showHeader
          ? "translate-y-0"
          : "-translate-y-full"
      }`}
    >
      {/* Header Top */}
      <div className="flex w-full items-center justify-between px-6 py-3 md:px-8">

        {/* Logo */}
        <Link href="/">
          <Image
            src={Cateringlogo}
            alt="Catering Logo"
            width={65}
            height={50}
            className="rounded-full object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Notification Bell */}
          {isLoggedIn && (
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-background transition hover:bg-muted focus:outline-none"
            >
              <Bell className="h-4 w-4" />

              {/* Unread notification count */}
              {/* Connect this later with notification state */}
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                0
              </span>
            </button>
          )}

          {/* User Dropdown */}
          <div className="min-w-12.5 justify-end">
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
                    className="flex h-8 w-8 items-center justify-center rounded-full border bg-background transition hover:bg-muted focus:outline-none"
                    aria-label="User menu"
                  >
                    <User className="w-4" />
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

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden"
          onClick={() =>
            setOpen((prev) => !prev)
          }
          aria-label={
            open
              ? "Close menu"
              : "Open menu"
          }
        >
          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        navItems={navItems}
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