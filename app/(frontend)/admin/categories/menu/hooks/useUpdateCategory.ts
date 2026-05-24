import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Category } from "../../../menu-items/types/types";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Category, unknown,FieldValues>({
    mutationFn: ({ id, name }) =>
      apiRequest({
        url: `/api/admin/category/${id}`,
        method: "PUT",
        body: { name },
        authRequired: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category updated successfully!");
      router.push("/admin/categories");
    },
    onError: (error:unknown) => {
      console.error(error);
      toast.error("Failed to update category");
    },
  });
}
