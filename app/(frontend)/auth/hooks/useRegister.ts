// hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/(frontend)/lib/firebase/firebase";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { AuthResponse } from "../types/types";
export function useRegister() {
  const router = useRouter();

  return useMutation<AuthResponse, Error, FieldValues>({
    mutationFn: async (data) => {
      const cred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      return apiRequest({
        url: "/api/auth/register",
        method: "POST",
        authRequired: true,
        body: {
          uid: cred.user.uid,
          email: cred.user.email,
          name: data.name,
        },
      });
    },

    onSuccess: (res) => {
      toast.success("Registration successful!");

      // role-based redirect
      if (res.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/client/dashboard");
      }
    },

    onError: (err:Error) => {
      console.log(err)
      toast.error("Registration failed");
    },
  });
}
