import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateStoreSettingsResponse, UpdateStoreSettingsPayload, UploadStoreLogoResponse } from "../types/type";

export function useUpdateStoreSettings() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateStoreSettingsResponse,
    Error,
    UpdateStoreSettingsPayload
  >({
    mutationFn: async (data) => {

      const { file, ...storeData } = data;

      // 1. Update store settings
      const storeResponse =
        await apiRequest<UpdateStoreSettingsResponse>({
          url: "/api/admin/settings/store",
          method: "PATCH",
          body: storeData,
          authRequired: true,
        });

      // 2. Upload logo if selected
      const selectedFile = file?.[0];

      if (selectedFile instanceof File) {
        const formData = new FormData();

        formData.append("image", selectedFile);
        formData.append(
          "storeId",
          storeResponse.store.id
        );

        const logoResponse =
          await apiRequest<UploadStoreLogoResponse>({
            url: "/api/admin/settings/store/image",
            method: "POST",
            body: formData,
            authRequired: true,
          });

        // Update returned store with new logo
        storeResponse.store.logo = logoResponse.logo;
        storeResponse.store.logoPublicId =
          logoResponse.logoPublicId;
      }

      return storeResponse;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["store-settings"],
      });

      toast.success("Store configuration updated");
    },

    onError: (error) => {
      console.error(
        "Update store settings error:",
        error
      );

      toast.error("Something went wrong");
    },
  });
}