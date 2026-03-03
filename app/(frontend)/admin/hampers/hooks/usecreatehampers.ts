import { FieldValues } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export function useCreateHamper() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: FieldValues) => {
      return apiRequest({
        url: "/api/admin/hampers",
        method: "POST",
        body: data,
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success("Hamper created successfully");
      router.push("/admin/hampers");
    },

    onError: () => {
      toast.error("Failed to create hamper");
    },
  });
}