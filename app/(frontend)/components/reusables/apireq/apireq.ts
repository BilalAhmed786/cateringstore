import { auth } from "@/app/(frontend)/lib/firebase/firebase";
import { getIdToken, onAuthStateChanged } from "firebase/auth";

async function getCurrentUserToken(): Promise<string | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();

      if (user) {
        try {
          const token = await getIdToken(user);
          resolve(token);
        } catch (error) {
          console.error("Failed to get Firebase token:", error);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
}

export async function apiRequest<
  TResponse = unknown,
  TBody = unknown
>({
  url,
  method = "GET",
  headers = {},
  authRequired = false,
  body,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  authRequired?: boolean | "optional";
  body?: TBody;
}): Promise<TResponse> {
  let token: string | null = null;

  // ---------------------------------------
  // Authentication
  // ---------------------------------------

  if (authRequired === true || authRequired === "optional") {
    token = await getCurrentUserToken();

    // Only throw when authentication is REQUIRED
    if (authRequired === true && !token) {
      throw new Error("User not authenticated");
    }
  }

  const isFormData = body instanceof FormData;

  // ---------------------------------------
  // Request
  // ---------------------------------------

  const res = await fetch(url, {
    method,
    credentials: "include",

    headers: {
      ...(isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...headers,
    },

    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  // ---------------------------------------
  // Success
  // ---------------------------------------

  if (res.ok) {
    return await res.json();
  }

  // ---------------------------------------
  // Unauthorized
  // ---------------------------------------

  if (res.status === 401 && authRequired === true) {
    await auth.signOut();

    window.location.href = "/auth/login";

    throw new Error("Session expired");
  }

  // ---------------------------------------
  // Other errors
  // ---------------------------------------

  throw new Error(await res.text());
}