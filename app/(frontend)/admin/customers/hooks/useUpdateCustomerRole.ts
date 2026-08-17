"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

type CustomerRole =
  | "CLIENT"
  | "ADMIN"
  | "SUPER_ADMIN";

interface UpdateCustomerRolePayload {
  id: string;
  role: CustomerRole;
}

export function useUpdateCustomerRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      role,
    }: UpdateCustomerRolePayload) => {
      return apiRequest({
        url: `/api/admin/customers/role/${id}`,
        method: "PATCH",
        body: {
          role,
        },
        authRequired: true,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
}