import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { UniButton } from "./(frontend)/components/reusables/button/button";
import "./(frontend)/globals.css"



export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <SearchX className="h-10 w-10" />
          </div>

          {/* 404 */}
          <p className="mt-8 text-8xl font-black tracking-tight text-primary sm:text-9xl">
            404
          </p>

          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Oops! This page isn&apos;t on the menu.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
            The page you&apos;re looking for may have been moved, removed, or
            the address might be incorrect.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/">
              <UniButton
                label="Back to Home"
                icon={<Home className="h-4 w-4" />}
              />
            </Link>

            <Link href="/events">
              <UniButton
                label="Explore Events"
                variant="outline"
                icon={<ArrowLeft className="h-4 w-4" />}
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}