import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import {
  ClientReviewsResponse,
  GetMyReviewsParams,
} from "../types/type";

export function useGetMyReviews({
  search = "",
  type = "ALL",
  page = 1,
  limit = 10,
}: GetMyReviewsParams = {}) {
  return useQuery<ClientReviewsResponse>({
    queryKey: [
      "client-reviews",
      search,
      type,
      page,
      limit,
    ],

    queryFn: async () => {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (type && type !== "ALL") {
        params.set("type", type);
      }

      params.set("page", String(page));
      params.set("limit", String(limit));

      return apiRequest<ClientReviewsResponse>({
        url: `/api/client/reviews?${params.toString()}`,
        method: "GET",
        authRequired: true,
      });
    },
  });
}