"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { CreatePackageReviewData } from "../types/type";

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