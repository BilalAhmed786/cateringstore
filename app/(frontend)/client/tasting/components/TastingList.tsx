"use client";

import { CalendarDays } from "lucide-react";

import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";

import TastingCard from "./TastingCard";


import {
  TastingInquiryStatus,
} from "../types/type";
import { useGetMyTastings } from "../hooks/useGetMyTastings";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";

interface TastingListProps {
  search: string;
  status: TastingInquiryStatus | "ALL";
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function TastingList({
  search,
  status,
  page,
  limit,
  onPageChange,
}: TastingListProps) {
  const {
    data,
    isLoading,
    isError,
  } = useGetMyTastings({
    search,
    status,
    page,
    limit,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border bg-background p-5"
          >
            <ContentSkeleton/>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border bg-background py-12 text-center">
        <CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

        <h2 className="font-semibold">
          Unable to load tasting requests
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while fetching your
          tasting requests.
        </p>
      </div>
    );
  }

  if (!data?.inquiries?.length) {
    return (
      <div className="rounded-2xl border bg-background py-12 text-center">
        <CalendarDays className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

        <h2 className="font-semibold">
          No tasting requests found
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          No tasting requests match your search or
          selected status.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.inquiries.map((inquiry) => (
          <TastingCard
            key={inquiry.id}
            inquiry={inquiry}
          />
        ))}
      </div>

      <ItemsPagination
        page={data.page}
        total={data.total}
        limit={data.limit}
        onPageChange={onPageChange}
      />
    </div>
  );
}
