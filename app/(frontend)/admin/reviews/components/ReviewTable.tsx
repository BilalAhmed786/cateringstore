"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";

import { DataTable } from "@/app/(frontend)/components/reusables/table/table";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

import { AdminReview } from "../types/type";
import { ReviewRating } from "./ReviewRating";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useCurrentUser } from "@/app/(frontend)/components/header/hook/useCurrentUser";
import { toast } from "sonner";

interface Props {
  reviews: AdminReview[];
}

export default function ReviewTable({ reviews }: Props) {
  const { user } = useCurrentUser();

  const deleteReview = useDeleteReview();

  const handleDelete = (review: AdminReview) => {
    deleteReview.mutate({
      id: review.id,
      type: review.type,
    });
  };

  return (
    <DataTable
      items={reviews}
      isLoading={false}
      columns={[
        {
          header: "Customer",
          accessor: (review) => review.customer.name ?? "N/A",
        },

        {
          header: "Product",
          accessor: (review) => (
            <div className="max-w-48 truncate">{review.product.name}</div>
          ),
        },

        {
          header: "Type",
          accessor: (review) => (
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              {review.type}
            </span>
          ),
        },

        {
          header: "Rating",
          accessor: (review) => <ReviewRating rating={review.rating} />,
        },

        {
          header: "Review",
          accessor: (review) => (
            <div className="max-w-72 truncate">
              {review.comment ?? "No comment"}
            </div>
          ),
        },

        {
          header: "Date",
          accessor: (review) => new Date(review.createdAt).toLocaleDateString(),
        },

        {
          header: "Action",
          accessor: (review) => (
            <div className="flex items-center gap-2">
              {/* View */}
              <Link href={`/admin/reviews/${review.id}`}>
                <UniButton
                  size="sm"
                  variant="outline"
                  icon={<Eye className="h-4 w-4" />}
                />
              </Link>

              {/* Delete */}
              <UniButton
                size="sm"
                variant="outline"
                icon={<Trash2 className="h-4 w-4" />}
                disabled={
                  deleteReview.isPending &&
                  deleteReview.variables?.id === review.id
                }
                onClick={() => {
                  if (user?.role !== "SUPER_ADMIN") {
                    toast.error(
                      "Unauthorized. Only Super Admin can delete reviews.",
                    );
                    return;
                  }

                  handleDelete(review);
                }}
              />
            </div>
          ),
        },
      ]}
    />
  );
}
