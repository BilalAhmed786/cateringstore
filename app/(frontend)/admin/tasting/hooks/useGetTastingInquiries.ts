import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

import {
  GetTastingInquiriesResponse,
} from "../types/type";

interface GetTastingInquiriesParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export function useGetTastingInquiries({
  search = "",
  status = "all",
  page = 1,
  limit = 10,
}: GetTastingInquiriesParams = {}) {
  return useQuery({
    queryKey: [
      "tasting-inquiries",
      search,
      status,
      page,
      limit,
    ],

    queryFn: async () => {
      const params = new URLSearchParams();

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (status !== "all") {
        params.set("status", status);
      }

      params.set("page", String(page));
      params.set("limit", String(limit));

      return apiRequest<GetTastingInquiriesResponse>({
        url: `/api/tasting?${params.toString()}`,
        method: "GET",
        authRequired: true,
      });
    },
  });
}