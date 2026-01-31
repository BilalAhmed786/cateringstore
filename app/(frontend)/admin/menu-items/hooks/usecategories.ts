  import { useQuery } from "@tanstack/react-query"
  import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
  import { Category } from "../types/menuitem"

  export function useCategories() {
    return useQuery<Category[]>({
      queryKey: ["categories"],
      queryFn: () =>
        apiRequest<Category[]>({
          url: "/api/categories",
          authRequired: true,
        }),
    })
  }
