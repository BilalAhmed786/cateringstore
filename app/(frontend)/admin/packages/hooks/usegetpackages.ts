import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { PackageFilters } from "../types/type";
import { GridItem } from "../../reusable/grid/gridtypes";


export function useGetPackages(filters?: PackageFilters) {
  return useQuery<{ items: GridItem[]; total: number }>({
    queryKey: ["packages", filters],
    queryFn: () =>
      apiRequest({
        url: `/api/admin/packages?${new URLSearchParams({
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
