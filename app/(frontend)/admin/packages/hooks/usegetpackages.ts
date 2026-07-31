import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { PackageFilters } from "../types/type";
import { GridItem } from "../../../components/reusables/grid/gridtypes";

export function useGetPackages(filters?: PackageFilters) {
  return useQuery({
    queryKey: ["packages", filters],
    queryFn: () =>
      apiRequest<{ items:GridItem[]; total: number }>({
        url: `/api/admin/packages?${new URLSearchParams({
          page: String(filters?.page ?? 1),
          limit: String(filters?.limit ?? 10),
          status: filters?.status ?? "",
          search: filters?.search ?? "",
          dateFilter: filters?.dateFilter ?? "",
          minPrice: String(filters?.minPrice ?? ""),
          maxPrice: String(filters?.maxPrice ?? ""),
        })}`,
        method: "GET",
        authRequired: false,
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 10,
  });
}
