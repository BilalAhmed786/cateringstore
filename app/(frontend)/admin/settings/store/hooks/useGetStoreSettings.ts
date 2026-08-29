import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { GetStoreSettingsResponse } from "../types/type";

export function useGetStoreSettings() {
  return useQuery<GetStoreSettingsResponse | null>({
    queryKey: ["store-settings"],

    queryFn: async () => {
      try {
        return await apiRequest<GetStoreSettingsResponse>({
          url: "/api/admin/settings/store",
          method: "GET",
          
        });
      } catch (error: unknown) {
        console.error("Get store settings error:", error);

        return null;
      }
    },
  });
}