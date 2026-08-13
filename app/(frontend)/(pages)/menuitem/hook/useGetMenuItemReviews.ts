"use client";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { MenuItemReview } from "../types/type";


export interface MenuItemReviewsResponse {
  reviews: MenuItemReview[];
  totalReviews: number;
  averageRating: number;
  canReview: boolean;
}

export function useGetMenuItemReviews(
  id: string,
  rating: string = "all",
  sort: string = "desc",
) {
  return useQuery<MenuItemReviewsResponse>({
    queryKey: [
      "menu-item-reviews",
      id,
      rating,
      sort,
    ],

    queryFn: () =>
      apiRequest<MenuItemReviewsResponse>({
        url: `/api/review/menuitem/${id}?rating=${rating}&sort=${sort}`,
        method: "GET",
        authRequired:"optional"
      }),

    enabled: !!id,
  });
}