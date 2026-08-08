"use client";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "../types/types";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";


export function useRecentOrders() {
  return useQuery<Order[]>({
    queryKey: ["dashboard", "recentOrders"],

    queryFn: async () => {
      return apiRequest<Order[]>({
        url:"/api/admin/order",
        method: "GET",
        authRequired:true
      });
    },

    staleTime: 30_000,
  });
}