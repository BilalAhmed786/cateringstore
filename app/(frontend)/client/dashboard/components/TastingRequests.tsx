"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Utensils,
} from "lucide-react";

import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";
import { useGetMyTastings } from "../../tasting/hooks/useGetMyTastings";

export default function TastingRequests() {
  const { data, isLoading, isError } = useGetMyTastings({
    page: 1,
    limit: 2,
  });

  const tastingStatusConfig = {
    PENDING: {
      label: "Pending Response",
      className: "bg-yellow-100 text-yellow-700",
    },
    CONFIRMED: {
      label: "Confirmed",
      className: "bg-blue-100 text-blue-700",
    },
    SCHEDULED: {
      label: "Scheduled",
      className: "bg-purple-100 text-purple-700",
    },
    COMPLETED: {
      label: "Completed",
      className: "bg-green-100 text-green-700",
    },
    REJECTED: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-gray-100 text-gray-600",
    },
  } as const;

  if (isLoading) {
    return <ContentSkeleton rows={3} />;
  }

  if (isError) {
    return (
      <section className="rounded-2xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-destructive">
          Failed to load tasting requests.
        </p>
      </section>
    );
  }

  const requests = data?.inquiries ?? [];

  return (
    <section className="rounded-2xl border bg-background shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="font-semibold">Tasting Requests</h2>

          <p className="text-sm text-muted-foreground">
            Track your tasting inquiries
          </p>
        </div>

        <Link
          href="/client/tasting"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Requests */}
      <div className="divide-y">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-10 text-center">
            <Utensils className="mb-3 h-10 w-10 text-muted-foreground" />

            <h3 className="font-medium">No tasting requests</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Your tasting requests will appear here.
            </p>

            <Link
              href="/contactus"
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Request a Tasting
            </Link>
          </div>
        ) : (
          requests.map((request) => {
            const status = tastingStatusConfig[request.status];

            return (
              <div
                key={request.id}
                className="px-5 py-4 transition-colors hover:bg-muted/40"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Utensils className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium">
                        {request.eventType} Tasting
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Requested{" "}
                        {new Date(
                          request.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Event information */}
                <div className="mt-4 flex flex-wrap gap-4 pl-[52px] text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />

                    <span>
                      {new Date(
                        request.date
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  {request.status === "PENDING" && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />

                      <span>
                        Waiting for admin response
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="mt-3 pl-[52px]">
                  <Link
                    href={`/client/tasting/${request.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View request details
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}