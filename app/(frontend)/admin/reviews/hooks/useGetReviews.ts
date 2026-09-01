"use client";

import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

import type {
  GetReviewsResponse,
} from "../types/type";

interface Props {
  page: number;
  limit: number;
  search?: string;
}

export function useGetReviews({
  page,
  limit,
  search = "",
}: Props) {
  return useQuery<GetReviewsResponse>({
    queryKey: [
      "admin-reviews",
      page,
      limit,
      search,
    ],

    queryFn: () =>
      apiRequest<GetReviewsResponse>({
        url: `/api/admin/review?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        method: "GET",
        authRequired: true,
      }),
  });
}