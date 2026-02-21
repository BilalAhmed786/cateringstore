'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useTogglePackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      available,
    }: {
      id: string;
      available: boolean;
    }) =>
      apiRequest({
        url: `/api/admin/package/${id}`,
        method: "PATCH",
        body: { available: !available },
        authRequired: true,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    },
  });
}
