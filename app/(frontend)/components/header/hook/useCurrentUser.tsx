"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

export type CurrentUser = {
  id: string;
  role: "CLIENT" | "ADMIN" | "SUPERADMIN";
};

type AuthorizeResponse = {
  user: CurrentUser;
};

export function useCurrentUser() {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
 console.log(user)
  const checkAuth = useCallback(async () => {
    try {
      const response = await apiRequest<AuthorizeResponse>({
        url: "/api/auth/authorize",
        method: "GET",
        authRequired:true
      });

      setUser(response?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const goToDashboard = useCallback(() => {
    if (!user) return;

    if (user.role === "ADMIN" || user.role === "SUPERADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/client/dashboard");
    }
  }, [user, router]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    goToDashboard,
  };
}
