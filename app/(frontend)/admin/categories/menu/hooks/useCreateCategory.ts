import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Category } from "../../../menu-items/types/types";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Category, unknown, FieldValues>({
    mutationFn: async (data) => {
      const formData = new FormData();

      // name
      formData.append("name", data.name);

      // image (ARRAY OR SINGLE)
      if (Array.isArray(data.image) && data.image.length > 0) {
        formData.append("image", data.image[0]);
      } else if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      return apiRequest<Category>({
        url: "/api/admin/category/menu",
        method: "POST",
        body: formData,
        authRequired: true,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully!");
      router.push("/admin/categories/menu");
    },

    onError: (error: unknown) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create category"
      );
    },
  });
}