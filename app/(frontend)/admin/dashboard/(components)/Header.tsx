"use client"
import { UniButton } from "@/app/(frontend)/components/reusables/button/button"
import { LogOut } from "lucide-react"
import { HeaderProps } from "../types/types"


export default function Header({ title = "Welcome Admin", onLogout }: HeaderProps) {
  return (
    <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center backdrop-blur-sm z-10">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <UniButton onClick={onLogout} variant="outline" size="sm" icon={<LogOut size={16} />} label="Logout" />
    </div>
  )
}
