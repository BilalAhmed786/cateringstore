import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { GridItem } from "../../reusable/grid/gridtypes";
import { eventFilters } from "../types/type";


export function useGetEvents(filters?: eventFilters) {
  return useQuery<{ items: GridItem[]; total: number }>({
    queryKey: ["events", filters],
    queryFn: () =>
    apiRequest({
        url: `/api/admin/event?${new URLSearchParams(
          {
            status: filters?.status ?? "",
            category: filters?.category ?? "",
            search: filters?.search ?? "",
            dateFilter: filters?.dateFilter ?? "",
            page: filters?.page?.toString() ?? "1",
            limit: filters?.limit?.toString() ?? "10",
          }
        )}`,
        method: "GET",
        authRequired: true,
      }),
})

}
