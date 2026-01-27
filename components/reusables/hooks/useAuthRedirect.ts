"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/components/reusables/apireq/apireq";
import { AuthResponse } from "@/app/auth/(components)/types/types";

export function useAuthRedirect() {
  const router = useRouter();

  const query = useQuery<AuthResponse>({
    queryKey: ["auth-user"],
    retry: false,
    queryFn: async () => {
      try {
        const result = await apiRequest<AuthResponse>({
          url: "/api/auth/authorize",
          method: "GET",
          authRequired: true,
        });

        if (result.user.role === "ADMIN") {
          router.replace("/admin/dashboard");
        } else if (result.user.role === "CLIENT") {
          router.replace("/client/dashboard");
        } else {
          router.replace("/auth/login");
        }

        return result;
      } catch (error) {
        router.replace("/auth/login");
        throw error; // important for React Query state
      }
    },
  });

  return {
    isPending: query.isPending,
  };
}
