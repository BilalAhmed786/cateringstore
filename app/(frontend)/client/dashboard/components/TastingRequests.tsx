"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  Utensils,
} from "lucide-react";

type TastingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SCHEDULED"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";

interface TastingRequest {
  id: string;
  title: string;
  eventDate: string;
  requestedAt: string;
  status: TastingStatus;
}

const tastingRequests: TastingRequest[] = [
  {
    id: "1",
    title: "Wedding Catering Tasting",
    eventDate: "Sep 15, 2026",
    requestedAt: "Aug 28, 2026",
    status: "PENDING",
  },
  {
    id: "2",
    title: "Birthday Event Tasting",
    eventDate: "Sep 22, 2026",
    requestedAt: "Aug 25, 2026",
    status: "SCHEDULED",
  },
];

function getStatusClass(status: TastingStatus) {
  switch (status) {
    case "CONFIRMED":
      return "bg-blue-100 text-blue-700";

    case "SCHEDULED":
      return "bg-purple-100 text-purple-700";

    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "REJECTED":
      return "bg-red-100 text-red-700";

    case "CANCELLED":
      return "bg-gray-100 text-gray-600";

    case "PENDING":
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function formatStatus(status: TastingStatus) {
  switch (status) {
    case "PENDING":
      return "Pending Response";

    case "CONFIRMED":
      return "Confirmed";

    case "SCHEDULED":
      return "Scheduled";

    case "COMPLETED":
      return "Completed";

    case "REJECTED":
      return "Rejected";

    case "CANCELLED":
      return "Cancelled";
  }
}

export default function TastingRequests() {
  return (
    <section className="rounded-2xl border bg-background shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="font-semibold">
            Tasting Requests
          </h2>

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

        {tastingRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-10 text-center">

            <Utensils className="mb-3 h-10 w-10 text-muted-foreground" />

            <h3 className="font-medium">
              No tasting requests
            </h3>

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
          tastingRequests.map((request) => (
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
                      {request.title}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Requested {request.requestedAt}
                    </p>
                  </div>

                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                    request.status,
                  )}`}
                >
                  {formatStatus(request.status)}
                </span>

              </div>

              {/* Event information */}
              <div className="mt-4 flex flex-wrap gap-4 pl-[52px] text-sm text-muted-foreground">

                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  <span>{request.eventDate}</span>
                </div>

                {request.status === "PENDING" && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>Waiting for admin response</span>
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
          ))
        )}

      </div>
    </section>
  );
}