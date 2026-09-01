// components/client/orders/hooks/useGetClientOrders.ts

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { OrderStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ClientOrdersResponse } from "../types/type";




interface UseGetClientOrdersParams {
  page?: number;
  limit?: number;
  status?: OrderStatus | "all";
}

export function useGetClientOrders({
  page = 1,
  limit = 10,
  status = "all",
}: UseGetClientOrdersParams = {}) {
  return useQuery<ClientOrdersResponse>({
    queryKey: [
      "client-orders",
      page,
      limit,
      status,
    ],

    queryFn: async () => {
      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", String(limit));

      if (status !== "all") {
        params.set("status", status);
      }

      return apiRequest<ClientOrdersResponse>(
          {
          url:`/api/client/orders?${params.toString()}`,
          method: "GET",
          authRequired:true
        }
      );
    },
  });
}