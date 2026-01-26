import { auth } from "@/lib/firebase";
import { getIdToken } from "firebase/auth";

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
    const user = auth.currentUser;

    if (!user) {
      window.location.href = "/login";
      throw new Error("User not authenticated");
    }

    token = await getIdToken(user); // Firebase token
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
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
  });

  if (res.ok) {
    return res.json();
  }

  if (res.status === 401 && authRequired) {
    await auth.signOut();
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  throw new Error(await res.text());
}
