"use client";

import { Bell, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { HeaderProps } from "../types/types";


export default function Header({
  title = "Welcome Admin",
}: HeaderProps) {
  const router = useRouter();

  return (
    <>
    

      <div className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-4 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <div className="flex items-center gap-3">
          {/* Notification */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 text-white transition hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell size={18} />

            {/* Notification badge */}
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              1
            </span>
          </button>

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
    </>
  );
}