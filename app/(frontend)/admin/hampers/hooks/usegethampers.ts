import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useGetHampers(params: Record<string, any>) {
  return useQuery({
    queryKey: ["hampers", params],
    queryFn: () =>
      apiRequest({
        url: "/api/admin/hampers",
        method: "GET",
        authRequired: true,
      }),
   
  });
}