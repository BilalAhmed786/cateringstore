"use client";

import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

import type { AdminReview } from "../types/type";

export function useGetReviewById(id: string) {
  return useQuery<AdminReview>({
    queryKey: ["admin-review", id],

    queryFn: () =>
      apiRequest<AdminReview>({
        url: `/api/review/${id}`,
        method: "GET",
        authRequired: true,
      }),

    enabled: !!id,
  });
}