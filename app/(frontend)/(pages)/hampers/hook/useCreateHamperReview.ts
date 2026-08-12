"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

interface CreateHamperReviewData {
  hamperId: string;
  rating: number;
  comment?: string | null;
}

export function useCreateHamperReview(hamperId: string) {
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const createReview = async (data: CreateHamperReviewData) => {
    try {
      setIsPending(true);

      const response = await apiRequest({
        url: "/api/review/hamper",
        method: "POST",
        body: {
          hamperId: data.hamperId,
          rating: data.rating,
          comment: data.comment || null,
        },
        authRequired: true,
      });

      console.log("Hamper review submitted:", response);

      // Refetch hamper details
      await queryClient.invalidateQueries({
        queryKey: ["hamper", hamperId],
      });

      return response;
    } catch (error) {
      console.error("Failed to submit hamper review:", error);
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