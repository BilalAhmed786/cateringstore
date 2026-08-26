"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Package,
  Star,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/(frontend)/components/ui/card";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";

import { useGetReviewById } from "../hooks/useGetReviewById";

interface Props {
  id: string;
}

export function ReviewDetails({ id }: Props) {
  const {
    data: review,
    isLoading,
  } = useGetReviewById(id);

  if (isLoading) {
    return <Loader />;
  }

  if (!review) {
    return (
      <div className="p-8">
        <p>Review not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-6">

      {/* Back */}
      <Link href="/admin/reviews">
        <UniButton
          className="mb-5"
          label="Back to Reviews"
          variant="outline"
          icon={
            <ArrowLeft className="h-4 w-4" />
          }
        />
      </Link>

      {/* Product */}
      <Card className="p-5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-5 sm:flex-row">

            {/* Image */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border bg-muted">
              {review.product.image ? (
                <Image
                  src={review.product.image}
                  alt={review.product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Product information */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                {review.product.name}
              </h2>

              <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {review.type}
              </span>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Customer */}
      <Card className="p-5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5 md:grid-cols-2">

            <div className="flex gap-3">
              <User className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Name
                </p>

                <p className="font-medium">
                  {review.customer.name ?? "N/A"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium">
                  {review.customer.email}
                </p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Review */}
      <Card className="p-5">
        <CardHeader>
          <CardTitle>
            Customer Review
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">

          {/* Rating */}
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Rating
            </p>

            <div className="flex gap-1">
              {Array.from({
                length: 5,
              }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Review
            </p>

            <div className="rounded-lg bg-muted p-5">
              <p className="whitespace-pre-wrap leading-7">
                {review.comment ??
                  "Customer did not leave a comment."}
              </p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </div>

        </CardContent>
      </Card>

    </div>
  );
}