"use client";
import { useGetOrders } from "@/app/(frontend)/admin/orders/hooks/useOrders";
import { NavItemProps, SubNavProps } from "../types/types";

import Link from "next/link";
import { useGetTastingInquiries } from "@/app/(frontend)/admin/tasting/hooks/useGetTastingInquiries";
export function NavItem({ open, icon: Icon, label, href }: NavItemProps) {
  const { data } = useGetOrders({
    page: 1,
    limit: 1000,
    search: "",
    status: "PENDING",
  });
  const { data: tasting } = useGetTastingInquiries({
    page: 1,
    limit: 1000,
    status: "PENDING",
  });
  const Pendingorders = data?.orders.map((data) => data.status === "PENDING");
  const Pendinginquries = tasting?.data?.map((inq) => inq.status === "PENDING");

  return (
    <Link
      href={href}
      className="w-full relative flex z-50 items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
    >
      <Icon size={20} />
      {open && <span className="text-sm font-medium">{label}</span>}

      {label === "Orders" && Pendingorders?.length && (
        <span
          className="absolute left-20 -top-1
               min-w-5 h-5
               flex items-center justify-center
               bg-white rounded-full
               px-1
               text-xs text-black"
        >
          {Pendingorders?.length}
        </span>
      )}
      {label === "Tasting Inquiries" && Pendinginquries?.length && (
        <span
          className="absolute right-14   -top-1
               min-w-5 h-5
               flex items-center justify-center
               bg-white rounded-full
               px-1
               text-xs text-black"
        >
          {Pendinginquries?.length}
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
