"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useDeleteMenuItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      alert(id)
      return apiRequest({
        url: `/api/admin/menuitem/${id}`,
        method: "DELETE",
        authRequired: true,
      });
    },
    onSuccess: () => {
      // Refetch menu items after deletion
      queryClient.invalidateQueries({ queryKey: ["menu-items"] });
    },
  });

  return mutation; // returns { mutate, isLoading, error, ... }
}
