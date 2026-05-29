import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export function useCreateEventCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: FormData) =>
      apiRequest({
        url: "/api/admin/category/event",
        method: "POST",
        body: payload,
        authRequired: true,
        
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventcategories"] });
      router.push("/admin/categories/event");
    },
  });
}