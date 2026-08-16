import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Order } from "../types/type";

export function useGetOrderById(id: string) {
  return useQuery({
    queryKey: ["admin-order", id],

    queryFn: () =>
      apiRequest<Order>({
        url: `/api/admin/order/${id}`,
        method: "GET",
        authRequired: true,
      }),

    enabled: !!id,
  });
}