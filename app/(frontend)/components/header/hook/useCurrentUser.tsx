"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { signOut } from "firebase/auth";
import { auth } from "@/app/(frontend)/lib/firebase/firebase";


export type CurrentUser = {
  id: string;
  role: "CLIENT" | "ADMIN" | "SUPER_ADMIN";
};

type AuthorizeResponse = {
  user: CurrentUser;
};

export function useCurrentUser() {
  const router = useRouter();

  const [user, setUser] =
    useState<CurrentUser | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response =
        await apiRequest<AuthorizeResponse>({
          url: "/api/auth/authorize/jwt",
          method: "GET",
          
        });

      setUser(response?.user ?? null);
    } catch {
      setUser(null);
      await signOut(auth);
    
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const goToDashboard = useCallback(() => {
    if (!user) return;

    if (
      user.role === "ADMIN" ||
      user.role === "SUPER_ADMIN"
    ) {
      router.push("/admin/dashboard");
    } else {
      router.push("/client/dashboard");
    }
  }, [user, router]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,

    // manually re-check cookie/JWT
    refreshUser: checkAuth,

    goToDashboard,
  };
}