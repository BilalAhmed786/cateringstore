import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { CategoryResponse, UseCategoriesOptions } from "../types/type";

export function useCategories({ page, limit, search }: UseCategoriesOptions) {
  return useQuery<CategoryResponse>({
    queryKey: ["categories", page, limit, search],
    queryFn: () =>
      apiRequest<CategoryResponse>({
        url: `/api/admin/categories?page=${page}&limit=${limit}&search=${search || ""}`,
        authRequired: true,
      }),
    
  });
}
