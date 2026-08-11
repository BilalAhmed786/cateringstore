"use client";

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
      // -----------------------------
      // Firebase registration
      // -----------------------------
      try {
        const cred = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        // -----------------------------
        // Backend registration
        // -----------------------------
        return await apiRequest<AuthResponse>({
          url: "/api/auth/register",
          method: "POST",
          authRequired: true,
          body: {
            uid: cred.user.uid,
            email: cred.user.email,
            name: data.name,
          },
        });
      } catch (error: unknown) {
        // Firebase errors
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error
        ) {
          const firebaseError = error as {
            code: string;
          };

          switch (firebaseError.code) {
            case "auth/email-already-in-use":
              throw new Error(
                "This email is already registered."
              );

            case "auth/invalid-email":
              throw new Error(
                "Please enter a valid email address."
              );

            case "auth/weak-password":
              throw new Error(
                "Password is too weak."
              );

            default:
              throw new Error(
                "Unable to create your account."
              );
          }
        }

        // Normal Error from apiRequest
        if (error instanceof Error) {
          throw error;
        }

        throw new Error("Registration failed.");
      }
    },

    onSuccess: (res) => {
      toast.success("Registration successful!");

      if (
        res.user.role === "ADMIN" || res.user.role === "SUPERADMIN"
      ) {
        router.push("/admin/dashboard");
      } else {
        router.push("/client/dashboard");
      }
    },

    onError: (error) => {
      console.error("Registration error:", error);

      toast.error(error.message);
    },
  });
}