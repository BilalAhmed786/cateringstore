import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useDeleteHamper() {
  return useMutation({
    mutationFn: async (id: string) => {
      return apiRequest({
        url: `/api/admin/hampers/${id}`,
        method: "DELETE",
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success("Hamper deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete hamper");
    },
  });
}