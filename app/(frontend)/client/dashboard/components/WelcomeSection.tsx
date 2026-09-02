"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Hand } from "lucide-react";

import { auth } from "@/app/(frontend)/lib/firebase/firebase";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";
import { Card, CardContent } from "@/app/(frontend)/components/ui/card";


export default function WelcomeSection() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  if (!user) {
    return <ContentSkeleton />;
  }

  const displayName =
    user.displayName ||
    user.email?.split("@")[0] ||
    "there";

  return (
    <Card className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

      <CardContent className="relative p-6 sm:p-8">
        <p className="mb-2 text-sm font-medium text-primary">
          Welcome back
        </p>

        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Hello, {displayName}
          <Hand className="h-6 w-6 rotate-45" />
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Manage your orders, tasting requests and reviews from your
          catering account.
        </p>
      </CardContent>
    </Card>
  );
}