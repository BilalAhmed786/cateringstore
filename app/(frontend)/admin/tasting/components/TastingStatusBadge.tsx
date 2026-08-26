import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import { TastingInquiryStatus } from "../types/type";

interface TastingStatusBadgeProps {
  status: TastingInquiryStatus;
}

const statusConfig: Record<
  TastingInquiryStatus,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },

  CONFIRMED: {
    label: "Confirmed",
    icon: CheckCircle2,
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },

  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },

  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

export default function TastingStatusBadge({
  status,
}: TastingStatusBadgeProps) {
  const config = statusConfig[status];

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />

      {config.label}
    </span>
  );
}