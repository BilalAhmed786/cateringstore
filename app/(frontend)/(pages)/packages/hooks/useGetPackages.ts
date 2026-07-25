import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { PackageFilters, PackageType } from "../types/type";




export function useGetPackages(filters?: PackageFilters) {
  return useQuery<{ items: PackageType[]; total: number }>({
    queryKey: ["packages", filters],

    queryFn: () =>
      apiRequest({
        url: `/api/admin/package?${new URLSearchParams({
          search: filters?.search ?? "",

          page: filters?.page?.toString() ?? "1",
          limit: filters?.limit?.toString() ?? "12",

          minPrice: filters?.minPrice?.toString() ?? "",
          maxPrice: filters?.maxPrice?.toString() ?? "",

          sort: filters?.sort ?? "",
        })}`,

        method: "GET",
        authRequired: false,
      }),

    staleTime: 1000 * 10,
  });
}