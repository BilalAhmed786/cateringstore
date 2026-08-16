import type { ComponentType } from "react"
import { AdminOrderListItem } from "../../orders/types/type"

export type SidebarProps = {
  open: boolean
  setOpen: (v: boolean) => void
  onLogout: () => void
  className?: string 
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

export interface Order {
  id: string;
  customer: string | null;
  amount: string;
  status: string;
  createdAt: string;
};

export interface RecentOrdersProps {
  orders: AdminOrderListItem[];
}

export type OrderStatus = "PENDING" | "CONFIRMED" | "COOKING" | "DELIVERED" | "CANCELLED";

export type StatsPeriod = "1m" | "3m" | "6m" | "1y";

export interface DashboardStat{
  value: number;
  trend: number;
};

export interface DashboardStats {
  totalOrders: DashboardStat;
  totalUsers: DashboardStat;
  revenue: DashboardStat;
  deliveredOrders: DashboardStat;
};

export interface DashboardStatsResponse {
  period: StatsPeriod;
  stats: DashboardStats;
};

export interface duration{
  label: string;
  value: StatsPeriod;

}