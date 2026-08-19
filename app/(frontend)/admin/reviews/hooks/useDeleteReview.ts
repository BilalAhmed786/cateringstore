"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { toast } from "sonner";

type DeleteReviewPayload = {
  id: string;
  type:
    | "MENU_ITEM"
    | "PACKAGE"
    | "EVENT"
    | "HAMPER";
};

export function useDeleteReview() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      type,
    }: DeleteReviewPayload) => {
      return apiRequest({
        url: `/api/review/${id}?type=${type}`,
        method: "DELETE",
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success(
        "Review deleted successfully"
      );

      queryClient.invalidateQueries({
        queryKey: ["admin-reviews"],
      });
    },

    onError: (error: Error) => {
      console.error(
        "DELETE REVIEW ERROR:",
        error
      );

      toast.error(
        error.message ||
          "You are not authorized to delete this review"
      );
    },
  });
}