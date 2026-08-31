"use client";

import { Bell, User } from "lucide-react";

export default function ClientHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-16 border-b bg-background/90 backdrop-blur-md md:left-64">
      <div className="flex h-full items-center justify-end gap-3 px-4 sm:px-6">
        
        {/* Notifications */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* Profile */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted"
        >
          <User className="h-4 w-4" />
        </button>

      </div>
    </header>
  );
}