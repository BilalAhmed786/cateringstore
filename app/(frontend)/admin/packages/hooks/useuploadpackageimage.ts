import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type UploadPackageImagePayload = {
  packageId: string;
  image: File;
};

export function useUploadPackageImage() {
  const queryClient = useQueryClient();
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
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey: ["package"],
        exact:false
      });
    },
    onError: () => {
      toast.error("Failed to upload package images");
    },
  });
}