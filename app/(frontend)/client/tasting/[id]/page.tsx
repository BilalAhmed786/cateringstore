
"use client";

import Link from "next/link";
import { ArrowLeft, Utensils } from "lucide-react";
import { useParams } from "next/navigation";

import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";

import TastingHeader from "./components/TastingHeader";
import TastingEventInfo from "./components/TastingEventInfo";
import TastingContactInfo from "./components/TastingContactInfo";
import TastingPreferences from "./components/TastingPreferences";
import TastingMessage from "./components/TastingMessage";
import TastingRequestInfo from "./components/TastingRequestInfo";

import { useGetMyTasting } from "../hooks/useGetMyTasting";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";

export default function TastingDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: tasting,
    isLoading,
    isError,
  } = useGetMyTasting(id);

  if (isLoading) return <ContentSkeleton/>
      
  if (isError || !tasting) {
    return (
      <div className="w-full space-y-6">
        <Link
          href="/client/tasting"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to tasting requests
        </Link>

        <div className="rounded-2xl border bg-background py-12 text-center">
          <Utensils className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

          <h2 className="font-semibold">
            Tasting request not found
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            We could not find this tasting request.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Metadata
        title="Tasting Request Details"
        desc="View your tasting request details"
      />

      <TastingHeader status={tasting.status} />

      <TastingEventInfo tasting={tasting} />

      <TastingContactInfo tasting={tasting} />

      <TastingPreferences
        preferences={tasting.foodPreferences}
      />

      <TastingMessage message={tasting.message} />

      <TastingRequestInfo tasting={tasting} />
    </div>
  );
}
