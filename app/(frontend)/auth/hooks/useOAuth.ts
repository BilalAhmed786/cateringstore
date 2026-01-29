// hooks/useOAuth.ts
import { useMutation } from "@tanstack/react-query";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "@/app/(frontend)/lib/firebase/firebase";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthResponse } from "../types/types";
export function useOAuth() {
  const router = useRouter();

  return useMutation<AuthResponse,Error,"google" | "facebook">({
    mutationFn: async (provider) => {
      const authProvider =
        provider === "google"
          ? new GoogleAuthProvider()
          : new FacebookAuthProvider();

      const result = await signInWithPopup(auth, authProvider);

      return apiRequest({
        url: "/api/auth/oauth",
        method: "POST",
        authRequired: true,
        body: {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
        },
      });
    },

    onSuccess: (res) => {
      toast.success("Logged in successfully!");

      if (res.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/client/dashboard");
      }
    },

    onError: () => {
      toast.error("OAuth login failed");
    },
  });
}
