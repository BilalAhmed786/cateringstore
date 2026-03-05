import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { GridItem } from "../../reusable/grid/gridtypes";
import { HamperFilters } from "../types/type";

export function useGetHampers(filters?: HamperFilters) {
  return useQuery<{ items: GridItem[]; total: number }>({
    queryKey: ["hampers", filters],
    queryFn: () =>
      apiRequest({
        url: `/api/admin/hamper?${new URLSearchParams({
          status: filters?.status ?? "",
          search: filters?.search ?? "",
          dateFilter: filters?.dateFilter ?? "",
        })}`,
        method: "GET",
        authRequired: true,
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 10,
  });
}