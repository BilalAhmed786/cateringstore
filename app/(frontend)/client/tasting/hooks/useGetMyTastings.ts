import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { ClientTastingInquiriesResponse, GetMyTastingInquiriesParams } from "../types/type";



export function useGetMyTastings(
  params: GetMyTastingInquiriesParams,
) {
  const {
    search,
    status,
    page = 1,
    limit = 10,
  } = params;

  const queryParams = new URLSearchParams();

  if (search?.trim()) {
    queryParams.set("search", search.trim());
  }

  if (status && status !== "ALL") {
    queryParams.set("status", status);
  }

  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));

  return useQuery<ClientTastingInquiriesResponse>({
    queryKey: [
      "client-tastings",
      search,
      status,
      page,
      limit,
    ],

    queryFn: async () => {
      return apiRequest<ClientTastingInquiriesResponse>({
        url: `/api/client/tasting?${queryParams.toString()}`,
        method: "GET",
        authRequired: true,
      });
    },

    placeholderData: (previousData) =>
      previousData,
  });
}
