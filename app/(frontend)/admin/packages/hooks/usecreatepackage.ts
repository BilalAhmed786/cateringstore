import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useUploadPackageImage } from "./useuploadpackageimage";


export function useCreatePackage() {
  const router = useRouter();
  const uploadImage = useUploadPackageImage();

  return useMutation<string, Error, FieldValues>({
    mutationFn: async (data) => {
      const {image:_image,...rest } = data;
        
      return apiRequest({
        url: "/api/admin/packages",
        method: "POST",
        body: rest,
        authRequired: true,
      });
    },

    onSuccess: async (response, variables) => {
      
      await uploadImage.mutateAsync({
          packageId: response,
          image: variables.image[0],
        });
      

      toast.success("Package created successfully");
      router.push("/admin/packages");
    },

    onError: () => {
      toast.error("Failed to create package");
    },
  });
}