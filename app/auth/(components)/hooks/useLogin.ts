// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { LoginValues } from "../types/types";

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginValues) => {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    },

    onSuccess: () => {
      toast.success("Logged in successfully!");
    },

    onError: (err: unknown) => {

        console.log(err)
      toast.error("Login failed");
    },
  });
}
