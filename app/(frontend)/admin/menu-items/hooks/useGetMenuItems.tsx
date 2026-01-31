import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { MenuItem } from "@/app/(frontend)/admin/menu-items/types/menuitem";

export function useGetMenuItems() {
  return useQuery<MenuItem>({
    queryKey: ["menu-items"],
    queryFn: () =>
      apiRequest({
        url: "/api/menu-items",
        method: "GET",
        authRequired: true,
      }),
  });
}