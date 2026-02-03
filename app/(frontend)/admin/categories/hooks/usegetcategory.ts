import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Category } from "../types/type";
export function useCategory(id: string) {
  return useQuery<Category>({
    queryKey: ["category", id],
    queryFn: () =>
      apiRequest<Category>({
        url: `/api/admin/category/${id}`,
        authRequired: true,
      }),
    enabled: !!id, 
  });
}
