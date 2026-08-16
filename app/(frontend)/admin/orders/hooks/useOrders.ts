import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { GetOrderprops, GetOrdersResponse } from "../types/type";

export function useGetOrders({
  page,
  limit,
  search,
  status,
}: GetOrderprops) {
  return useQuery({
    queryKey: [
      "admin-orders",
      page,
      limit,
      search,
      status,
    ],

    queryFn: () =>
      apiRequest<GetOrdersResponse>({
        url: `/api/admin/order?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}&status=${status}`,
        method: "GET",
        authRequired: true,
      }),
  });
}