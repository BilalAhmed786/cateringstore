import { useQuery } from "@tanstack/react-query"
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
import { GetPackagesResponse } from "../types/type"


type Params = {
  search?: string
  status?: string
  page: number
  limit: number
}

export function useGetPackages(params: Params) {
  return useQuery({
    queryKey: ["packages", params],
    queryFn: () =>
      apiRequest<GetPackagesResponse>({
        url: "/api/admin/packages",
        method: "GET",
        authRequired: true,
      }),
  })
}
