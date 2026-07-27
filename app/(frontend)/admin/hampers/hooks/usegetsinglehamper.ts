import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Hamper } from "../types/type";




export function useGetSingleHamperDetails(id?: string) {
  return useQuery<Hamper>({
    queryKey: ["hamper", id],
    queryFn: () =>
      apiRequest({
        url: `/api/admin/hamper/${id}`,
        method: "GET",
        authRequired: false,
      }),
    enabled: !!id,
  });
}