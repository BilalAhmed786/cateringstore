import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { FeaturedPackage } from "../types/type";

export function useFeaturedPackages() {
  return useQuery({
    queryKey: ["featured-packages"],
    queryFn: async () => {
      return apiRequest<FeaturedPackage[]>({
        url: "/api/package",
        method: "GET",
      });
    },
  });
}