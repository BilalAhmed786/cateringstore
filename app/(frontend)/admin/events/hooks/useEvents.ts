import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { EventsResponse, UseEventsOptions } from "../types/type";

export function useEvents({ page, limit, search }: UseEventsOptions) {
  return useQuery<EventsResponse>({
    queryKey: ["events", page, limit, search || ""],
    queryFn: () =>
      apiRequest<EventsResponse>({
        url: `/api/admin/event/paginated?page=${page}&limit=${limit}&search=${search || ""}`,
        method: "GET",
        authRequired: true,
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 10,
  });
}

