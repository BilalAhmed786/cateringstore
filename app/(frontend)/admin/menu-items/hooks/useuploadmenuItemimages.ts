import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
import { useMutation } from "@tanstack/react-query"
import { UploadMenuItemImagesPayload } from "../types/types";



export function useUploadMenuItemImages() {
  return useMutation({
    mutationFn: async ({
      menuItemId,
      image,
    }: UploadMenuItemImagesPayload) => {
      

      const formData = new FormData();

      const files = Array.isArray(image) ? image : [image];

      files.forEach((file) => {
        formData.append("images", file);
      });

      return apiRequest({
        url: `/api/admin/images/${menuItemId}`,
        method: "POST",
        authRequired: true,
        body: formData,
      });
    },
  });
}
