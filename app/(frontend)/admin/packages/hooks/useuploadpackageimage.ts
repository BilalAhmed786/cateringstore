import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


type UploadPackageImagePayload = {
  packageId: string;
  image: File;
};

export function useUploadPackageImage() {
  return useMutation({
    mutationFn: async ({ packageId, image }: UploadPackageImagePayload) => {
      const formData = new FormData();

        formData.append("packageId", packageId);
        formData.append("image", image);
      

      return apiRequest({
        url: "/api/admin/packages/image",
        method: "POST",
        body: formData,
        authRequired: true,
    });
    },

    onError: () => {
      toast.error("Failed to upload package images");
    },
  });
}