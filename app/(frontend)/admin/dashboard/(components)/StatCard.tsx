"use client"

import React from "react"
import { Card } from "@/app/(frontend)/components/ui/card"
import type { StatCardProps } from "../../types/types"

export default function StatCard({ label, value, trend, icon: Icon }: StatCardProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition-all group cursor-pointer">
      <div className="flex items-center justify-between p-6">
        <div className="flex-1">
          <p className="text-slate-400 text-sm font-medium">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-bold text-white">{value}</p>
            {trend && <span className="text-green-400 text-sm font-medium">{trend}</span>}
          </div>
        </div>
        <div className="bg-slate-700/50 group-hover:bg-slate-600/50 p-3 rounded-lg transition-all">
          <Icon size={24} className="text-blue-400" />
        </div>
      </div>
    </Card>
  )
}
