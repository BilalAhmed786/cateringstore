"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "@/app/(frontend)/lib/firebase/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const mutation = useMutation<boolean, unknown, void>({
    mutationFn: async () => {
      await signOut(auth);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to logout from server");

      return true;
    },

    onSuccess: () => {
      toast.success("Logged out successfully!");
      router.replace("/auth/login");
    },

    onError: (err: unknown) => {
      console.error(err);
      toast.error("Logout failed");
    },
  });

  const logout = () => mutation.mutate();
  const logoutAsync = () => mutation.mutateAsync();

  return { ...mutation, logout, logoutAsync };
}
