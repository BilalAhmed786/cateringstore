import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

import type { CustomerDetails } from "../types/type";

export function useGetCustomerById(id: string) {
  return useQuery<CustomerDetails>({
    queryKey: ["customer", id],

    queryFn: () =>
      apiRequest<CustomerDetails>({
        url: `/api/admin/customers/${id}`,
        method: "GET",
        authRequired: true,
      }),

    enabled: !!id,
  });
}