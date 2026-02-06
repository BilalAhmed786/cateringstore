import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { FieldValues } from "react-hook-form";


export function useUpdateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }:FieldValues) =>
      apiRequest({
        url: `/api/admin/menuitem/${id}`,
        method: "PUT",
        body: payload,
        authRequired: true,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["menu-item", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["menu-items"],
      });
    },
  });
}
