import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

type ToggleEventPayload = {
  id: string;
  available: boolean;
};

export function useToggleEvent() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, ToggleEventPayload>({
    mutationFn: async ({ id, available }) => {
      await apiRequest({
        url: `/api/admin/event/${id}/toggle`,
        method: "PATCH",
        body: {
          available: !available, 
        },
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success("Event status updated");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update event status"
      );
    },
  });
}