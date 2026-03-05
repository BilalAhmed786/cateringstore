import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { Event } from "../types/type";
export function useAllEvents() {
  return useQuery<Event[]>({
    queryKey: ["events", "all"],
    queryFn: () =>
      apiRequest<Event[]>({
        url: `/api/admin/event`,
        method: "GET",
        authRequired: true,
      }),
    staleTime: 1000 * 60, // cache for 1 minute
  });
}