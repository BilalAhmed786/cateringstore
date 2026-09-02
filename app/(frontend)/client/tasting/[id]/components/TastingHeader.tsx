"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { TastingInquiryStatus } from "../../types/type";

interface TastingHeaderProps {
  status: TastingInquiryStatus;
}

function getStatusClass(status: TastingInquiryStatus) {
  switch (status) {
    case "CONFIRMED":
      return "bg-blue-100 text-blue-700";

    case "COMPLETED":
      return "bg-green-100 text-green-700";

    case "CANCELLED":
      return "bg-gray-100 text-gray-600";

    case "PENDING":
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

function formatStatus(status: TastingInquiryStatus) {
  switch (status) {
    case "PENDING":
      return "Pending Response";

    case "CONFIRMED":
      return "Confirmed";

    case "COMPLETED":
      return "Completed";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
}

export default function TastingHeader({ status }: TastingHeaderProps) {
  return (
    <>
      <Link
        href="/client/tasting"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to tasting requests
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <span
          className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${getStatusClass(
            status,
          )}`}
        >
          {formatStatus(status)}
        </span>
      </div>
    </>
  );
}
