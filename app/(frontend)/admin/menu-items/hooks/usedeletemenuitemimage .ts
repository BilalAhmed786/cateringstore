// hooks/useDeleteMenuItemImage.ts
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useDeleteMenuItemImage() {
  return useMutation({
    mutationFn: async ({
      menuItemId,
      imageId,
    }: {
      menuItemId: string;
      imageId: string;
    }) => {
      return apiRequest({
        url: `/api/admin/images/${menuItemId}/${imageId}`,
        method: "DELETE",
        authRequired: true,
      });
    },
  });
}
