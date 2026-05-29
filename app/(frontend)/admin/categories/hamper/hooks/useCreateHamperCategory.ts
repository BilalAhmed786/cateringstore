import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export function useCreateHamperCategory() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: FormData) =>
      apiRequest({
        url: "/api/admin/category/hamper",
        method: "POST",
        body: payload,
        authRequired: true,
        
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hampercategories"] });
      router.push("/admin/categories/hamper");
    },
  });
}