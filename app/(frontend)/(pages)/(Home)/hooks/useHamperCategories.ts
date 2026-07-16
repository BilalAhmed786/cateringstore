import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { FeaturedHamperCategory } from "../types/type";

export function useHamperCategories() {
  return useQuery({
    queryKey: ["featured-hamper-categories"],
    queryFn: async () =>
      apiRequest<FeaturedHamperCategory[]>({
        url: "/api/hamper",
        method: "GET",
      }),
  });
}