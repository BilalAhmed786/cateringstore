"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

type UpdateOrderStatusPayload = {
  id: string;
  status:string;
};

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: UpdateOrderStatusPayload) => {
      return apiRequest({
        url:`/api/admin/order/${id}`,
        method: "PATCH",
        body:{status},
        authRequired:true,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "recentOrders"],
      });
    },
  });
}