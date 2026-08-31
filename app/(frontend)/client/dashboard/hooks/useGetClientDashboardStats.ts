// hooks/client/useGetClientDashboardStats.ts

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { ClientDashboardStats } from "../types/type";


export const useGetClientDashboardStats = () => {
  return useQuery<ClientDashboardStats>({
    queryKey: ["client-dashboard-stats"],
    queryFn: () =>
      apiRequest<ClientDashboardStats>(
          {
           url:"/api/client/stats",
           method: "GET",
           authRequired:true
        }
      ),
  });
};