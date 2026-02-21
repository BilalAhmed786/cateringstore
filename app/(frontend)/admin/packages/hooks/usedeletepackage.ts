'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useDeletePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) =>
      apiRequest({
        url: `/api/admin/package/${id}`,
        method: "DELETE",
        authRequired: true,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    },
  });
}
