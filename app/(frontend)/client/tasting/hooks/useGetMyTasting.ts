import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";

import { ClientTastingInquiry } from "../types/type";

export function useGetMyTasting(id: string) {
  return useQuery<ClientTastingInquiry>({
    queryKey: ["client-tasting", id],

    queryFn: async () => {
      return apiRequest<ClientTastingInquiry>({
        url: `/api/client/tasting/${id}`,
        method: "GET",
        authRequired: true,
      });
    },

    enabled: !!id,
  });
}
