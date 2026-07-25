// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/(frontend)/lib/firebase/firebase";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useRouter } from "next/navigation";
import { AuthResponse } from "../types/types";
import { FieldValues } from "react-hook-form";
export function useLogin() {
  const router = useRouter();

  return useMutation<AuthResponse, Error,FieldValues >({
    mutationFn: async (data) => {
      // 1  Login via Firebase
      const cred = await signInWithEmailAndPassword(auth, data.email, data.password);

      // 2 Call backend to generate app JWT
      return apiRequest({
        url: "/api/auth/login",
        method: "POST",
        authRequired: true,
        body: {
          uid: cred.user.uid,
          email: cred.user.email,
        },
      });
    },

    onSuccess: (res) => {
      toast.success("Login successful!");

      if (res.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/client/dashboard");
      }
    },

    onError: (err: Error) => {
      console.log(err);
      toast.error("Login failed");
    },
  });
}
