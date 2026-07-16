import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { MenuCategory } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";



export function useMenuCategories() {
  return useQuery({
    queryKey: ["menu-categories"],
    queryFn: async () => {
      return apiRequest<MenuCategory[]>({
        url: "/api/menuitem",
        method: "GET",
      });
    },
  });
}