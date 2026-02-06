"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useToggleMenuItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, available }: { id: string; available: boolean }) => {
      return apiRequest({
        url: `/api/admin/menuitem/${id}`,
        method: "PATCH",
        body: { available: !available },
        authRequired: true,
      });
    },
    onSuccess: () => {
      // Refetch menu items after toggling
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });

  return mutation; // returns { mutate, isLoading, error, ... }
}
