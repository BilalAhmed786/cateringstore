// hooks/useUpdatePackage.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
export function useUpdatePackage() {
  const queryClient = useQueryClient();
  const router = useRouter()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: FieldValues}) =>
      apiRequest({
        url: `/api/admin/packages/${id}`,
        method: "PATCH",
        body: payload,
        authRequired: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
       router.push("/admin/packages")
    },
  });
}