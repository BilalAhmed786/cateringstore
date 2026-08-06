import Link from "next/link";
import { XCircle } from "lucide-react";

type FailedPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function FailedPage({
  searchParams,
}: FailedPageProps) {
  const { message } = await searchParams;

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md rounded-xl border p-8 text-center shadow">
        <XCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />

        <h1 className="mb-3 text-3xl font-bold">
          Payment Failed
        </h1>

        <p className="mb-6 text-muted-foreground">
          {message ||
            "Unfortunately your payment could not be completed. Please try again."}
        </p>

        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block rounded-lg bg-black px-5 py-3 text-white"
          >
            Try Again
          </Link>

          <Link
            href="/"
            className="block rounded-lg border px-5 py-3"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}