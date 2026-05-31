import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

type UploadHamperImagePayload = {
  hamperId: string;
  image: File;
};

export function useUploadHamperImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ hamperId, image }: UploadHamperImagePayload) => {
      const formData = new FormData();

      formData.append("hamperId", hamperId);
      formData.append("image", image);

      return apiRequest({
        url: "/api/admin/hamper/image",
        method: "POST",
        body: formData,
        authRequired: true,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hamper"],
        exact: false,
      });
    },

    onError: () => {
      toast.error("Failed to upload hamper image");
    },
  });
}