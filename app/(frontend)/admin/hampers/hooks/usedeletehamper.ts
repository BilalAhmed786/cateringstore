import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useDeleteHamper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return apiRequest({
        url: `/api/admin/hamper/${id}`,
        method: "DELETE",
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success("Hamper deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["hampers"] })
    },

    onError: () => {
      toast.error("Failed to delete hamper");
    },
  });
}