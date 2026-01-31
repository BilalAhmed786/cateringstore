"use client"

import React from "react"
import StatCard from "./StatCard"
import type { StatsGridProps } from "../types/types"

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => <StatCard key={i} {...s} />)}
    </div>
  )
}
