import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useUpdateHamper() {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: any;
    }) => {
      return apiRequest({
        url: `/api/admin/hampers/${id}`,
        method: "PUT",
        body: payload,
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success("Hamper updated successfully");
      router.push("/admin/hampers");
    },

    onError: () => {
      toast.error("Failed to update hamper");
    },
  });
}