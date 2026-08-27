import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import {
  UpdateStoreSettingsPayload,
  UpdateStoreSettingsResponse,
} from "../types/type";
import { toast } from "sonner";


export function useUpdateStoreSettings() {
  return useMutation<
    UpdateStoreSettingsResponse,
    Error,
    UpdateStoreSettingsPayload
  >({
    mutationFn: (data) =>
      apiRequest<UpdateStoreSettingsResponse>({
        url: "/api/admin/settings/store",
        method: "PATCH",
        body: data,
        authRequired: true,
      }),

    onSuccess: (data) => {
      if(data){

        toast.success("store configration updated");
      }
    },

    onError: (error) => {
      if(error){

        toast.error("something went wrong");
      }
    },
  });
}