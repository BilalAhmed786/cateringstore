import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { FeaturedEventCategory } from "../types/type";

export function useEventCategories() {
  return useQuery({
    queryKey: ["featured-event-categories"],
    queryFn: async () =>
      apiRequest<FeaturedEventCategory[]>({
        url: "/api/event",
        method: "GET",
      }),
  });
}