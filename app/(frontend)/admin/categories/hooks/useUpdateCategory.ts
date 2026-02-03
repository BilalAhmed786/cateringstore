import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "../../menu-items/types/menuitem";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      apiRequest<Category>({
        url: `/api/categories/${id}`,
        method: "PUT",
        body: { name },
        authRequired: true,
      }),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });
}
