"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COOKING"
  | "DELIVERED"
  | "CANCELLED";

type UpdateOrderStatusPayload = {
  id: string;
  status: OrderStatus;
};

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: UpdateOrderStatusPayload) => {
      console.log("1. Sending status update:", {
        orderId: id,
        status,
      });

      const response = await apiRequest({
        url: `/api/admin/order/${id}`,
        method: "PATCH",
        body: {
          status,
        },
        authRequired: true,
      });

      return response;
    },

    onSuccess: (data, variables) => {
      console.log("Status update successful");

      // Refresh dashboard/recent orders
      queryClient.invalidateQueries({
        queryKey: ["admin-orders"],
      });

      // Refresh specific order details
      queryClient.invalidateQueries({
        queryKey: ["admin-order", variables.id],
      });
    },

    onError: (error) => {
      console.error("Status update failed:", error);
    },
  });
}