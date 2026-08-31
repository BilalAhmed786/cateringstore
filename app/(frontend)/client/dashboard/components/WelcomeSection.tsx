"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/(frontend)/lib/firebase/firebase";
import { Hand } from "lucide-react";


export default function WelcomeSection() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        <p className="mb-2 text-sm font-medium text-primary">
          Welcome back 
        </p>

        <h1 className="text-2xl flex gap-2 font-bold tracking-tight sm:text-3xl">
          Hello, {displayName} <Hand className="h-6 w-6 rotate-45 mt-2.5" />
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Manage your orders, tasting requests and reviews
          from your catering account.
        </p>
      </div>
    </section>
  );
}