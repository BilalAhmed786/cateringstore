"use client";

import { Bell, Home, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { useNotificationStore } from "@/app/(frontend)/store/notificationStore";

export default function ClientHeader() {
  const router = useRouter();

  const [notificationOpen, setNotificationOpen] = useState(false);

  const notifications = useNotificationStore(
    (state) => state.notifications,
  );

  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications,
  );

  return (
    <header className="z-30 h-20 border-b bg-background/90 backdrop-blur-md md:left-64">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted md:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationOpen((prev) => !prev)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />

              {notifications.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {notificationOpen && (
              <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg border bg-background shadow-xl">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <h3 className="font-semibold">Notifications</h3>

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
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="border-b px-4 py-3 transition-colors hover:bg-muted"
                      >
                        <p className="font-medium">
                          {notification.title}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.body}
                        </p>

                        {notification.orderId && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Order ID: {notification.orderId}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Home */}
          <UniButton
            onClick={() => router.push("/")}
            variant="outline"
            size="sm"
            icon={<Home size={16} />}
            label="Home"
          />
        </div>
      </div>
    </header>
  );
}