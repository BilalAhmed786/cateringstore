import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Category } from "../../menu-items/types/types";
import { FieldValues } from "react-hook-form";


export function useCreateCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Category, unknown, FieldValues>({
    mutationFn: ({ name }) =>
      apiRequest<Category>({
        url: "/api/admin/category",
        method: "POST",
        body: { name },
        authRequired: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // Show success toast
      toast.success("Category created successfully!");

      // Redirect to categories listing page
      router.push("/admin/categories");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create category");
      }
    },
  });
}
