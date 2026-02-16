import { FieldValues } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";



export function useCreatePackage() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: FieldValues) => {
      return apiRequest({
        url: "/api/admin/packages",
        method: "POST",
        body: data,
        authRequired: true,
      });
    },

    onSuccess: () => {
      toast.success("Package created successfully");
      router.push("/admin/packages");
    },

    onError: () => {
      toast.error("Failed to create package");
    },
  });
}
