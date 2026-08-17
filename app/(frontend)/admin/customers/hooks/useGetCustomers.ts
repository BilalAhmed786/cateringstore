import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

import type { GetCustomersResponse } from "../types/type";

interface GetCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useGetCustomers({
  page = 1,
  limit = 10,
  search = "",
}: GetCustomersParams = {}) {
  return useQuery<GetCustomersResponse>({
    queryKey: [
      "customers",
      page,
      limit,
      search,
    ],

    queryFn: () =>
      apiRequest<GetCustomersResponse>({
        url:
          `/api/admin/customers` +
          `?page=${page}` +
          `&limit=${limit}` +
          `&search=${encodeURIComponent(search)}`,

        method: "GET",
        authRequired: true,
      }),
  });
}