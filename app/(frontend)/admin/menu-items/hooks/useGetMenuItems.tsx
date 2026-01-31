import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
import { MenuItem, MenuItemsFilters } from "../types/menuitem"



export function useGetMenuItems(filters?: MenuItemsFilters) {
  return useQuery<{ items: MenuItem[]; total: number }>({
    queryKey: ["menu-items", filters], // include filters in queryKey for caching
    queryFn: () =>
      apiRequest<{ items: MenuItem[]; total: number }>({
        url: `/api/menu-items?${new URLSearchParams(
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
