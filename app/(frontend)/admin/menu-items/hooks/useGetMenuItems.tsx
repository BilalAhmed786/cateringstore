import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
import { MenuItemsFilters } from "../types/types"
import { GridItem } from "../../../components/reusables/grid/gridtypes";


export function useGetMenuItems(filters?: MenuItemsFilters) {
  return useQuery<{ items: GridItem[]; total: number }>({
    queryKey: ["menu-items", filters], // include filters in queryKey for caching
    queryFn: () =>
      apiRequest({
        url: `/api/admin/menuitem?${new URLSearchParams(
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
    
      placeholderData: (prev) => prev, 
      staleTime: 1000 * 10,
  })  
}
