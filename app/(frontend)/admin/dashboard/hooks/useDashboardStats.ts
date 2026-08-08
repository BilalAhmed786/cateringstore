"use client";

import { useQuery } from "@tanstack/react-query";
import type {
  DashboardStats,
  DashboardStatsResponse,
  StatsPeriod,
} from "../types/types";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";




export function useDashboardStats(period: StatsPeriod) {
  return useQuery<DashboardStats>({
    queryKey: ["dashboard", "stats", period],

    queryFn: async () => {
      const response = await apiRequest<DashboardStatsResponse>({
       url: `/api/admin/stats?period=${period}`,
       method:"GET",
       authRequired:true
      }
      );

      return response.stats;
    },

    staleTime: 60_000,
  });
}