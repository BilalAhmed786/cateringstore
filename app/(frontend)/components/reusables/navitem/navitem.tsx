'use client'
import { NavItemProps,SubNavProps } from "../types/types"

import Link from "next/link"
export function NavItem({ open, icon: Icon, label, href }: NavItemProps) {
  return (
    <Link
      href={href}
      className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
    >
      <Icon size={20} />
      {open && <span className="text-sm font-medium">{label}</span>}
    </Link>
  )
}

export function SubNav({ icon: Icon, label, href }:SubNavProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
    >
      <Icon size={16} />
      {label}
    </Link>
  )
}