import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { Eventcategory } from "../types/type";


export const useEventCategory = (id: string) => {
  return useQuery({
    queryKey: ["editeventcategory", id],
    queryFn: () =>
      apiRequest<Eventcategory>({
        url: `/api/admin/category/event/${id}`,
        method: "GET",
        authRequired: true,
      }),
    enabled: !!id,
  });
};