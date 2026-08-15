import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { GetPackageReviewsParams, PackageReviewResponse } from "../types/type";


export function useGetPackageReviews({selectedPackageId, rating = "all", sort = "desc" }: GetPackageReviewsParams) {
  return useQuery({
    queryKey: ["package-reviews",selectedPackageId, rating, sort],

    queryFn: async () => {
      const params = new URLSearchParams({
        rating,
        sort,
      });

      return apiRequest<PackageReviewResponse>({
        url: `/api/review/package/${selectedPackageId}?${params.toString()}`,
        method: "GET",
        authRequired:"optional"
      });
    },

    enabled: !!selectedPackageId,
  });
}