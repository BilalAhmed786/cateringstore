import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Category } from "../../menu-items/types/menuitem";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) =>
      apiRequest<Category>({
        url: "/api/admin/categories",
        method: "POST",
        body: { name },
        authRequired: true,
      }),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });
}
