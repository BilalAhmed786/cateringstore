import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Category } from "../../../menu-items/types/types";
import { FieldValues } from "react-hook-form";


export function useCreateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: FieldValues) => {
       const formData = new FormData();

       formData.append("name", data.name);

      if (data.image instanceof File) {
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
      toast.error(error instanceof Error ? error.message : "Failed to create category");
    },
  });
}
