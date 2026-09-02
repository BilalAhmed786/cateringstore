"use client";

import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Users,
  Utensils,
} from "lucide-react";

import { ClientTastingInquiry } from "../types/type";

interface TastingCardProps {
  inquiry: ClientTastingInquiry;
}

function getStatusClass(
  status: ClientTastingInquiry["status"],
) {
  switch (status) {
    case "CONFIRMED":
      return "bg-blue-100 text-blue-700";

    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-red-100 text-red-700";

    case "PENDING":
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function formatStatus(
  status: ClientTastingInquiry["status"],
) {
  switch (status) {
    case "PENDING":
      return "Pending Response";

    case "CONFIRMED":
      return "Confirmed";

    case "COMPLETED":
      return "Completed";

    case "CANCELLED":
      return "Cancelled";
  }
}

export default function TastingCard({
  inquiry,
}: TastingCardProps) {
  const eventDate = new Date(inquiry.date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const requestedAt = new Date(
    inquiry.createdAt,
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border bg-background p-5 shadow-sm transition-colors hover:bg-muted/20">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Utensils className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold">
              {inquiry.eventType} Tasting
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Requested {requestedAt}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
            inquiry.status,
          )}`}
        >
          {formatStatus(inquiry.status)}
        </span>
      </div>

      {/* Information */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0" />

          <span>{eventDate}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0" />

          <span>{inquiry.time}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 shrink-0" />

          <span>{inquiry.guests} guests</span>
        </div>
      </div>

      {/* Food preferences */}
      {inquiry.foodPreferences.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium text-muted-foreground">
            Food Preferences
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {inquiry.foodPreferences.map(
              (preference) => (
                <span
                  key={preference}
                  className="rounded-full bg-muted px-3 py-1 text-xs"
                >
                  {preference}
                </span>
              ),
            )}
          </div>
        </div>
      )}

      {/* Details */}
      <div className="mt-5 border-t pt-4">
        <Link
          href={`/client/tasting/${inquiry.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View request details
        </Link>
      </div>
    </div>
  );
}
