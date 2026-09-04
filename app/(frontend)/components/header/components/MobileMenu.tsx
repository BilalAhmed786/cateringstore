"use client";

import Link from "next/link";
import { Loader } from "../../reusables/loader/loader";
import { UniButton } from "../../reusables/button/button";
import { MobileMenuProps } from "../types/type";

export function MobileMenu({
  navItems,
  isOpen,
  onClose,
  authLoading,
  isLoggedIn,
  isPending,
  onDashboard,
  onLogout,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="border-t md:hidden">
      <nav className="flex flex-col p-4">
        {/* Navigation */}
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-md px-3 py-3 hover:bg-muted"
          >
            {item.name}
          </Link>
        ))}

        {/* Auth */}
        <div className="mt-4 flex flex-col gap-2">
          {authLoading ? (
            <Loader variant="inline" size={20} />
          ) : isLoggedIn ? (
            <>
              <UniButton
                variant="outline"
                onClick={() => {
                  onDashboard();
                  onClose();
                }}
                label="Dashboard"
              />

              <UniButton
                variant="destructive"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                disabled={isPending}
                label={isPending ? "Logging out..." : "Logout"}
              />
            </>
          ) : (
            <>
              <UniButton
                variant="ghost"
                onClick={() => {
                  onClose();
                  window.location.href = "/auth/login";
                }}
                label="Login"
              />

              <UniButton
                variant="default"
                onClick={() => {
                  onClose();
                  window.location.href = "/auth/register";
                }}
                label="Register"
              />
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
