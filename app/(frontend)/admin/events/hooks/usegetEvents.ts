import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { eventFilters } from "../types/type";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";

export function useGetEvents(filters?: eventFilters) {
  return useQuery({
    queryKey: ["events", filters],

    queryFn: () =>
      apiRequest<{
        items: GridItem[];
        total: number;
      }>({
        url: `/api/admin/event?${new URLSearchParams({
          page: String(filters?.page ?? 1),
          limit: String(filters?.limit ?? 10),
          category: filters?.category ?? "",
          status: filters?.status ?? "",
          search: filters?.search ?? "",
          dateFilter: filters?.dateFilter ?? "",
          minPrice:
            filters?.minPrice !== undefined
              ? String(filters.minPrice)
              : "",
          maxPrice:
            filters?.maxPrice !== undefined
              ? String(filters.maxPrice)
              : "",
          sort: filters?.sort ?? "",
        })}`,

        method: "GET",
        authRequired: false,
      }),

    staleTime: 1000 * 10,
  });
}