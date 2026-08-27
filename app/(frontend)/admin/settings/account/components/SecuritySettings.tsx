"use client";

import { Button } from "@/app/(frontend)/components/ui/button";

export default function SecuritySettings() {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Security
        </h2>

        <p className="text-sm text-slate-500">
          Manage your account security and active sessions.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-slate-900">
            Logout from other devices
          </p>

          <p className="text-sm text-slate-500">
            Sign out your account from all other active sessions.
          </p>
        </div>

        <Button variant="outline">
          Logout Others
        </Button>
      </div>
    </section>
  );
}