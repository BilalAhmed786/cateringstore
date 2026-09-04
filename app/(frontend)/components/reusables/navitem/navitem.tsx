"use client";
import { useGetOrders } from "@/app/(frontend)/admin/orders/hooks/useOrders";
import { NavItemProps, SubNavProps } from "../types/types";

import Link from "next/link";
export function NavItem({ open, icon: Icon, label, href }: NavItemProps) {
  const { data } = useGetOrders({
    page: 1,
    limit: 1000,
    search: "",
    status: "PENDING",
  });
  const Pendingorders = data?.orders.map((data) => data.status === "PENDING");

  return (
    <Link
      href={href}
      className="w-full relative flex z-50 items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
    >
      <Icon size={20} />
      {open && <span className="text-sm font-medium">{label}</span>}
      
      {label === "Orders" && Pendingorders?.length && (
        
        <span
          className="absolute right-32 -top-1 
         bg-white rounded-full px-1.5 py-1 text-xs text-black"
        >
          {Pendingorders?.length}
        </span>
      )}
    </Link>
  );
}

export function SubNav({ icon: Icon, label, href }: SubNavProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}
