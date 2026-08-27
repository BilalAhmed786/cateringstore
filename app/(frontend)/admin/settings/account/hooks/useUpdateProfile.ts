import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { UpdateProfileResponse, UpdateProfilePayload } from "../types/type";



export function useUpdateProfile() {
  return useMutation<
    UpdateProfileResponse,
    Error,
    UpdateProfilePayload
  >({
    mutationFn: async (data) => {
      return apiRequest<UpdateProfileResponse>({
        url: "/api/admin/settings/account",
        method: "PATCH",
        body:data,
        authRequired:true
      });
    },
  });
}