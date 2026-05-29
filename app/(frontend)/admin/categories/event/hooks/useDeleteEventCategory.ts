import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteEventCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
     return apiRequest<{ success: boolean }>({
        url: `/api/admin/category/event/${id}`,
        method: "DELETE",
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["eventcategories"] });
    },

    onError: (error: unknown) => {
      console.error(error);
      toast.error("Failed to delete category");
    },
  });
}
