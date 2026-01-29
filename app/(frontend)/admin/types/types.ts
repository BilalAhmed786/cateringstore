import type { ComponentType } from "react"

export type SidebarProps = {
  open: boolean
  setOpen: (v: boolean) => void
  onLogout: () => void
}

export type HeaderProps = {
  title?: string
  onLogout: () => void
}

export type StatItem = {
  label: string
  value: string
  trend?: string
  icon: ComponentType<{ size?: number; className?: string }>
}

export type StatCardProps = StatItem

export type StatsGridProps = {
  stats: StatItem[]
}

export type Order = {
  id: string
  customer: string
  amount: string
  status: string
}

export type RecentOrdersProps = {
  orders: Order[]
}
