import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Hampers } from "../types/type";


export function useGetHamperDetails(id?: string) {
  return useQuery<Hampers>({
    queryKey: ["hamper", id],
    queryFn: () =>
      apiRequest({
        url: `/api/admin/hamper/${id}`,
        method: "GET",
        authRequired: true,
      }),
    enabled: !!id,
  });
}