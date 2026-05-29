import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export const useUpdateHamperCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      id,
      name,
    }: {
      id: string;
      name: string;
    }) =>
      apiRequest({
        url: `/api/admin/category/hamper/${id}`,
        method: "PATCH",
        body: { name },
        authRequired: true,
      }),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["edithampercategory", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["edithampercategory"],
      });

      router.push("/admin/categories/hamper");
    },
  });
};