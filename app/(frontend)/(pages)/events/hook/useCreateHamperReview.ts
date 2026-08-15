"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

interface CreateEventReviewData {
  eventId: string;
  rating: number;
  comment?: string | null;
}

export function useCreateEventReview(id:(string | null)) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const createReview = async (data: CreateEventReviewData) => {
    try {
      setIsPending(true);

      const response = await apiRequest({
        url: `/api/review/event/${id}`,
        method: "POST",
        body: {
          eventId: data.eventId,
          rating: data.rating,
          comment: data.comment || null,
        },
        authRequired: true,
      });

      // Refresh event details
      await queryClient.invalidateQueries({
        queryKey: ["event", data.eventId],
      });

      return response;
    } catch (error) {
      console.error("Failed to submit event review:", error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  return {
    createReview,
    isPending,
  };
}