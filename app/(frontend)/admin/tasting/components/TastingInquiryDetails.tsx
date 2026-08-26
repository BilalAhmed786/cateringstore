"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Users } from "lucide-react";
import { toast } from "sonner";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { BaseSelect } from "@/app/(frontend)/components/reusables/filters/filterselect";

import { useGetTastingInquiry } from "../hooks/useGetTastingInquiry";
import { useUpdateTastingInquiryStatus } from "../hooks/useUpdateTastingInquiryStatus";
import { TastingInquiryStatus } from "../types/type";

// Replace this with your actual auth hook
import { useCurrentUser } from "@/app/(frontend)/components/header/hook/useCurrentUser";

interface Props {
  id: string;
}

const statusOptions = [
  {
    label: "Pending",
    value: "PENDING",
  },

  {
    label: "Confirmed",
    value: "CONFIRMED",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

export default function TastingInquiryDetails({
  id,
}: Props) {
  const router = useRouter();

  const { user } = useCurrentUser();

  const { data, isLoading, isError } =
    useGetTastingInquiry(id);

  const updateStatus =
    useUpdateTastingInquiryStatus();

  const inquiry = data?.data;

  const [status, setStatus] =
    useState<TastingInquiryStatus | undefined>();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading tasting inquiry...
      </div>
    );
  }

  if (isError || !inquiry) {
    return (
      <div className="p-6 text-destructive">
        Failed to load tasting inquiry.
      </div>
    );
  }

  const currentStatus = status ?? inquiry.status;

  const isSuperAdmin =
    user?.role === "SUPER_ADMIN";

  const handleStatusChange = async (
    value: string,
  ) => {
    const newStatus =
      value as TastingInquiryStatus;

    setStatus(newStatus);

    try {
      await updateStatus.mutateAsync({
        id: inquiry.id,
        status: newStatus,
      });

      toast.success(
        "Tasting inquiry status updated.",
      );
    } catch (error) {
      console.error(error);

      setStatus(inquiry.status);

      toast.error(
        "Failed to update tasting status.",
      );
    }
  };

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex items-center gap-4">
        <UniButton
          label="Back"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
          onClick={() =>
            router.push("/admin/tasting")
          }
        />

        <div>
          <h1 className="text-2xl font-bold">
            Tasting Inquiry
          </h1>

          <p className="text-sm text-muted-foreground">
            View tasting request details.
          </p>
        </div>
      </div>

      {/* Customer */}

      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Customer Information
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <div>
            <p className="text-sm text-muted-foreground">
              Name
            </p>

            <p className="font-medium">
              {inquiry.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <p className="font-medium">
              {inquiry.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Phone
            </p>

            <p className="font-medium">
              {inquiry.phone}
            </p>
          </div>

        </div>
      </div>

      {/* Event */}

      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Tasting Details
        </h2>

        <div className="grid gap-6 md:grid-cols-4">

          <div className="flex gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Event
              </p>

              <p className="font-medium">
                {inquiry.eventType}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Users className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Guests
              </p>

              <p className="font-medium">
                {inquiry.guests}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Date
              </p>

              <p className="font-medium">
                {new Date(
                  inquiry.date,
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                Time
              </p>

              <p className="font-medium">
                {inquiry.time}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Food */}

      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Food Preferences
        </h2>

        {inquiry.foodPreferences.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {inquiry.foodPreferences.map(
              (food) => (
                <span
                  key={food}
                  className="rounded-full bg-muted px-3 py-1 text-sm"
                >
                  {food}
                </span>
              ),
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No food preferences provided.
          </p>
        )}

        {inquiry.message && (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Message
            </p>

            <p className="mt-1">
              {inquiry.message}
            </p>
          </div>
        )}
      </div>

      {/* Status */}

      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">
          Status
        </h2>

        {isSuperAdmin ? (
          <BaseSelect
            label="Tasting Status"
            value={currentStatus}
            onChange={handleStatusChange}
            options={statusOptions}
            placeholder="Select status"
          />
        ) : (
          <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
            {currentStatus}
          </span>
        )}
      </div>

    </div>
  );
}