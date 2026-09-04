"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
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
  notifications,
  clearNotifications,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="border-t md:hidden">
      <nav className="flex flex-col p-4">

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

        {/* Notifications */}
        {isLoggedIn && (
          <div className="mt-4 border-t pt-4">
            <div className="mb-3 flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />

                <span className="font-semibold">
                  Notifications
                </span>

                {notifications.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                    {notifications.length}
                  </span>
                )}
              </div>

              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearNotifications}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="rounded-md border px-4 py-5 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto rounded-md border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="cursor-pointer border-b px-3 py-3 last:border-b-0 hover:bg-muted"
                  >
                    <p className="font-medium">
                      {notification.title}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.body}
                    </p>

                    {notification.orderId && (
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        Order ID: {notification.orderId}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
