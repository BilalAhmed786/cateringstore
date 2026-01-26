import { useMutation } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { auth } from "@/lib/firebase";
import { apiRequest } from "@/components/reusables/apireq/apireq";

/* ================= TYPES ================= */

export type RegisterValues = {
  name: string;
  email: string;
  password: string;
};

export type LoginValues = {
  email: string;
  password: string;
};

/* ================= MUTATION OBJECT ================= */

export const authMutations = {
  /* -------- REGISTER -------- */
  useRegister() {
    return useMutation({
      mutationFn: async (data: RegisterValues) => {
        // 1️⃣ Firebase Auth
        const cred = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        // 2️⃣ Store user in Prisma
        await apiRequest({
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
    });
  },

  /* -------- LOGIN -------- */
  useLogin() {
    return useMutation<void, Error, LoginValues>({
      mutationFn: async (data: LoginValues) => {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      },
    });
  },

  /* -------- OAUTH -------- */
  useOAuth() {
    return useMutation({
      mutationFn: async (provider: "google" | "facebook") => {
        const authProvider =
          provider === "google"
            ? new GoogleAuthProvider()
            : new FacebookAuthProvider();

        const result = await signInWithPopup(auth, authProvider);

        // Ensure user exists in Prisma
        await apiRequest({
          url: "/api/auth/register",
          method: "POST",
          authRequired: true,
          body: {
            uid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
          },
        });
      },
    });
  },
};
