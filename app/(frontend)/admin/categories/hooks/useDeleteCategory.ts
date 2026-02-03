import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiRequest<{ success: boolean }>({
        url: `/api/categories/${id}`,
        method: "DELETE",
        authRequired: true,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"]})
  });
}
