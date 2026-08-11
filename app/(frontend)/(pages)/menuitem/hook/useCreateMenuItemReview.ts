"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

interface CreateReviewData {
  menuItemId: string;
  rating: number;
  comment?: string | null;
}

export function useCreateMenuItemReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateReviewData) => {
      try {
        const response = await apiRequest({
          url: "/api/review/menuitem",
          method: "POST",
          body: data,
          authRequired:true
        });

        return response;
      } catch (error) {
        console.error("Failed to submit review:", error);
        throw error;
      }
    },

    onSuccess: (_, variables) => {
       queryClient.invalidateQueries({
        queryKey: ["menu-items", variables.menuItemId],
      });
    },
  });
}