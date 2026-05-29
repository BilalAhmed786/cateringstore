import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { toast } from "sonner";

export function useUpdateEventCategoryImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      image,
    }: {
      id: string;
      image: File;
    }) => {
      const formData = new FormData();
      formData.append("image", image);

      return apiRequest({
        url: `/api/admin/category/event/${id}/image`,
        method: "PUT",
        body: formData,
        authRequired: true,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editeventcategory"] });
      toast.success("Image updated successfully!");
    },

    onError: () => {
      toast.error("Image update failed");
    },
  });
}