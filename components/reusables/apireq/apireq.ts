import { auth } from "@/lib/firebase/firebase";
import { getIdToken, onAuthStateChanged } from "firebase/auth";

async function getCurrentUserToken(): Promise<string | null> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe(); // Stop listening after first call
      if (user) {
        const token = await getIdToken(user);
        resolve(token);
      } else {
        resolve(null);
      }
    });
  });
}

export async function apiRequest<TResponse = unknown, TBody = unknown>({
  url,
  method = "GET",
  headers = {},
  authRequired = false,
  body,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  authRequired?: boolean;
  body?: TBody;
}): Promise<TResponse> {
  let token: string | null = null;

  if (authRequired) {
    // ✅ Use async listener instead of auth.currentUser directly
    token = await getCurrentUserToken();

    if (!token) {
      throw new Error("User not authenticated");
    }
  }

  const isFormData = body instanceof FormData;

  const res = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  }

  if (res.status === 401 && authRequired) {
    await auth.signOut();
    window.location.href = "/auth/login";
    throw new Error("Session expired");
  }

  throw new Error(await res.text());
}
