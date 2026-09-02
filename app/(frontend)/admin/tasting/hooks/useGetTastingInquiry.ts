import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { GetSingleTastingInquiryResponse } from "../../../(pages)/tasting/types/type";



export function useGetTastingInquiry(id: string) {
  return useQuery({
    queryKey: ["tasting-inquiry", id],

    queryFn: () =>
      apiRequest<GetSingleTastingInquiryResponse>({
        url: `/api/admin/tasting/${id}`,
        method: "GET",
        authRequired: true,
      }),

    enabled: Boolean(id),
  });
}