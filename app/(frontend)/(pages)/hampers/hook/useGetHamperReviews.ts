import { useQuery } from "@tanstack/react-query";
import { GetHamperReviewsResponse } from "../types/type";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";




export function useGetHamperReviews(
  hamperId?: string,
  rating: string = "all",
  sort: "asc" | "desc" = "desc",
) {
  return useQuery<GetHamperReviewsResponse>({
    queryKey: [
      "hamper-reviews",
      hamperId,
      rating,
      sort,
    ],

    queryFn: async () => {
      return apiRequest<GetHamperReviewsResponse>({

          url: `/api/review/hamper/${hamperId}?rating=${rating}&sort=${sort}`,
          method:"GET",
          authRequired:"optional"

      }
       
      );
    },

    enabled: !!hamperId,
  });
}