import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Event } from "../types/type";

export function useEvent(id: string) {
  return useQuery<Event>({
    queryKey: ["event", id],
    queryFn: () =>
      apiRequest<Event>({
        url: `/api/admin/event/${id}`,
        authRequired: true,
      }),
    enabled: !!id,
  });
}

