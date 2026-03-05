import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useToggleHamper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      available,
    }: {
      id: string;
      available: boolean;
    }) => {
      return apiRequest({
        url: "/api/admin/hamper/toggle",
        method: "PATCH",
        body: { id, available },
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success("Hamper status updated");
       queryClient.invalidateQueries({ queryKey: ["hampers"] })
    },

    onError: () => {
      toast.error("Failed to update hamper status");
    },
  });
}