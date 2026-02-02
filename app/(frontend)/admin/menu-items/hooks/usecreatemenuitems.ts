import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useUploadMenuItemImages } from "./useuploadmenuItemimages"
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
import { FieldValues } from "react-hook-form"

export function useCreateMenuItemWithImages() {
  const router = useRouter()
  const { mutate: uploadImages } = useUploadMenuItemImages()

  return useMutation({
    mutationFn: async (data: FieldValues) => {
      // 1️⃣ Separate files from JSON data
      const { images, status, ...rest } = data

      // Convert price & status
      const payload = {
        ...rest,
        price: Number(rest.price),
        available: status === "true",
      }

      // 2️⃣ Create menu item (JSON)
      const menuItem = await apiRequest<{ id: string }>({
        url: "/api/menu-items",
        method: "POST",
        body: payload,
        authRequired: true,
      })

      // 3️⃣ Upload images if exist
      if (images && images.length > 0) {
        await uploadImages(
          { menuItemId: menuItem.id, images },
          {
            onSuccess: () => {
              router.push("/dashboard/menu-items")
            },
          }
        )
      } else {
        router.push("/dashboard/menu-items")
      }

      return menuItem
    },
  })
}
