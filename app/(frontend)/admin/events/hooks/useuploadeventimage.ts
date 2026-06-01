import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

type UploadEventImagePayload = {
  eventId: string;
  image: File;
};

export function useUploadEventImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, image }: UploadEventImagePayload) => {
      const formData = new FormData();

      formData.append("eventId", eventId);
      formData.append("image", image);

      return apiRequest({
        url: "/api/admin/event/image",
        method: "POST",
        body: formData,
        authRequired: true,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event"],
        exact: false,
      });
    },

    onError: () => {
      toast.error("Failed to upload hamper image");
    },
  });
}