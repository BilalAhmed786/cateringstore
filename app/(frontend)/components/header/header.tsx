"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Cateringlogo from "../../assets/saif catering.png";
import { UniButton } from "../reusables/button/button";
import { Loader } from "../reusables/loader/loader";
import { useLogout } from "@/app/(frontend)/admin/dashboard/hooks/useLogout";
import { useHeaderScroll } from "./hook/useHeaderScroll";
import { useCurrentUser } from "./hook/useCurrentUser";
import { MobileMenu } from "./components/MobileMenu";




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
  } = useCurrentUser();

  const { logout, isPending } = useLogout();

  const isLoggedIn = !!user;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-white/90 backdrop-blur-md shadow-sm transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Header Top */}
      <div className="flex items-center justify-between px-6 py-3 md:px-8">
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

        {/* Desktop Actions */}
        <div className="hidden min-w-47.5 items-center justify-end gap-3 md:flex">
          {authLoading ? (
            <Loader
              variant="inline"
              size={20}
              className="min-w-47.5"
            />
          ) : isLoggedIn ? (
            <>
              <UniButton
                variant="outline"
                onClick={goToDashboard}
                label="Dashboard"
              />

              <UniButton
                variant="destructive"
                onClick={logout}
                disabled={isPending}
                label={
                  isPending
                    ? "Logging out..."
                    : "Logout"
                }
              />
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <UniButton
                  variant="ghost"
                  label="Login"
                />
              </Link>

              <Link href="/auth/register">
                <UniButton
                  variant="default"
                  label="Register"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
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
        onLogout={logout}
      />
    </header>
  );
}
