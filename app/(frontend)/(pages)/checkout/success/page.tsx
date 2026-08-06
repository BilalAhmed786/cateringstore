import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md rounded-xl border p-8 text-center shadow">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />

        <h1 className="mb-3 text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="mb-6 text-muted-foreground">
          Thank you! Your payment has been received successfully.
          We are now preparing your order.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block rounded-lg bg-black px-5 py-3 text-white"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="block rounded-lg border px-5 py-3"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}