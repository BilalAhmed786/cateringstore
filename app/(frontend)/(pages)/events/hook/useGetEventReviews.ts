"use client";

import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { EventReviewResponse, GetEventReviewsParams } from "../types/type";



export function useGetEventReviews({
  selectedEventId,
  rating = "all",
  sort = "desc",
}: GetEventReviewsParams) {
  return useQuery<EventReviewResponse>({
    queryKey: [
      "event-reviews",
      selectedEventId,
      rating,
      sort,
    ],

    queryFn: async () => {
      if (!selectedEventId) {
        throw new Error("Event ID is required");
      }

      return apiRequest({
       url: `/api/review/event/${selectedEventId}?rating=${rating}&sort=${sort}`,
       method:"GET",
       authRequired:"optional"
    });
    },

    enabled: !!selectedEventId,
  });
}