import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Category } from "@/app/(frontend)/admin/menu-items/types/types";

export function useAllCategories() {
  return useQuery<Category[]>({
    queryKey: ["all-categories"],
    queryFn: () =>
      apiRequest<Category[]>({
        url: "/api/admin/category/menu",
        authRequired: false,
      }),
  });
}
