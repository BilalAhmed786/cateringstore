import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
import { useMutation } from "@tanstack/react-query"


interface UploadMenuItemImagesPayload {
  menuItemId: string
  images: File[]
}

export function useUploadMenuItemImages() {
  return useMutation({
    mutationFn: async ({
      menuItemId,
      images,
    }: UploadMenuItemImagesPayload) => {

      const formData = new FormData()

      images.forEach((file) => {
        formData.append("images", file)
      })

      return apiRequest({
        url: `/api/menu-items/${menuItemId}/images`,
        method: "POST",
        authRequired: true,
        body: formData, 
      })
    },
  })
}
