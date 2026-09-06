"use client";

import Link from "next/link";

export default function TooManyRequestsPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-4xl font-bold">
          Too Many Requests
        </h1>

        <p className="mt-4 text-muted-foreground">
          You have made too many requests in a short period of time.
          Please wait a little while and try again.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-primary px-5 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
