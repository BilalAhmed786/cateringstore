import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { MenuItem } from "../types/types";

export function useGetMenuItemById(id?: string) {
  return useQuery<MenuItem>({
    queryKey: ["menu-item", id],
    enabled: !!id,
    queryFn: () =>
      apiRequest({
        url: `/api/admin/menuitem/${id}`,
        authRequired: "optional",
      }),
  });
}
