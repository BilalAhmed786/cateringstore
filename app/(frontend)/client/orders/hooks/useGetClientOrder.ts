
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { GetClientOrderResponse } from "../types/type";


export function useGetClientOrder(id: string) {
  return useQuery<GetClientOrderResponse>({
    queryKey: ["client-order", id],

    queryFn: async () => {
      return apiRequest<GetClientOrderResponse>(
          {
          url:`/api/client/orders/${id}`,
          method: "GET",
          authRequired:true
        },
      );
    },

    enabled: !!id,
  });
}
