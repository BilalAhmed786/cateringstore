import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq"
import { CreateMenuItemPayload } from "../types/menuitem"

export function useCreateMenuItem() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (body: CreateMenuItemPayload) =>
      apiRequest({
        url: "/api/menu-items",
        method: "POST",
        authRequired: true,
        body,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menu-items"] })
    },
  })
}
