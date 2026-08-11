"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

interface CreatePackageReviewData {
  packageId: string;
  rating: number;
  comment?: string | null;
}

export function useCreatePackageReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePackageReviewData) => {
      return await apiRequest({
        url: "/api/review/package",
        method: "POST",
        authRequired: true,
        body: data,
      });
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["package", variables.packageId],
      });
    },
  });
}