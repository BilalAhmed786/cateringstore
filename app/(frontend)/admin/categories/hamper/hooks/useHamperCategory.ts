import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { Hampercategory } from "../types/type";


export const useHamperCategory = (id: string) => {
  return useQuery({
    queryKey: ["edithampercategory", id],
    queryFn: () =>
      apiRequest<Hampercategory>({
        url: `/api/admin/category/hamper/${id}`,
        method: "GET",
        authRequired: true,
      }),
    enabled: !!id,
  });
};