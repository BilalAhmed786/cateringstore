import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useUploadHamperImage } from "./useuploadhamperimage";

export function useCreateHamper() {
  const router = useRouter();
  const uploadImage = useUploadHamperImage();

  return useMutation<string, Error, FieldValues>({
    mutationFn: async (data) => {
      const { image:_image, ...rest } = data;

      return apiRequest({
        url: "/api/admin/hamper",
        method: "POST",
        body: rest,
        authRequired: true,
      });
    },

    onSuccess: async (hamperId, variables) => {
  
      if (variables.image) {
        await uploadImage.mutateAsync({
          hamperId,
          image: variables.image[0],
        });
      }

      toast.success("Hamper created successfully");
      router.push("/admin/hampers");
    },

    onError: () => {
      toast.error("Failed to create hamper");
    },
  });
}