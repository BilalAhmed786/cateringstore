import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useUploadMenuItemImages } from "./useuploadmenuItemimages"
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"
export function useCreateMenuItemWithImages() {
  const router = useRouter()
  const { mutate: uploadImages } = useUploadMenuItemImages()

  return useMutation({
    mutationFn: async (data: FieldValues) => {
 
      // 1️⃣ Separate files from JSON data
      const { image, ...rest } = data
      

      // Convert price & status
      const payload = {
        ...rest,
        price: Number(rest.price),
     
      }

      // 2️⃣ Create menu item (JSON)
      const menuItem = await apiRequest<{ id: string }>({
        url: "/api/admin/menuitem",
        method: "POST",
        body: payload,
        authRequired: true,
      })

      // 3️⃣ Upload images if exist
    if (image && image.length !== 0) {
        await uploadImages(
          { menuItemId: menuItem.id, image },
          {
            onSuccess: () => {
              router.push("/admin/menu-items")
            },
          }
        )
      } else {
            toast.error('something went wrong')
      }

      return menuItem
    },
  })
}
