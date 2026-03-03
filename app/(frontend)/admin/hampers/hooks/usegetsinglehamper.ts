import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useGetHamperDetails(id?: string) {
  return useQuery({
    queryKey: ["hamper", id],
    queryFn: () =>
      apiRequest({
        url: `/api/admin/hampers/${id}`,
        method: "GET",
        authRequired: true,
      }),
    enabled: !!id,
  });
}