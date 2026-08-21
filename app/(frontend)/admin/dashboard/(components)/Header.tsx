"use client";

import { Bell, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { HeaderProps } from "../types/types";
import { useNotificationStore } from "@/app/(frontend)/store/notificationStore";


export default function Header({
  title = "Welcome Admin",
}: HeaderProps) {
  const router = useRouter();

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const notifications = useNotificationStore(
    (state) => state.notifications
  );

  const clearNotifications = useNotificationStore(
    (state) => state.clearNotifications
  );

  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-4 backdrop-blur-sm">
      {/* Title */}
      <h2 className="text-2xl font-bold text-white">
        {title}
      </h2>

      <div className="flex items-center gap-3">
        {/* Notification */}
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setNotificationOpen((prev) => !prev)
            }
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 text-white transition hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell size={18} />

            {/* Badge */}
            {notifications.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {notificationOpen && (
            <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
                <h3 className="font-semibold text-white">
                  Notifications
                </h3>

                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={clearNotifications}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Notifications */}
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-slate-400">
                  No notifications
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="border-b border-slate-800 px-4 py-3 hover:bg-slate-800"
                    >
                      <p className="font-medium text-white">
                        {notification.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        {notification.body}
                      </p>

                      {notification.orderId && (
                        <p className="mt-1 text-xs text-slate-500">
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
  );
}