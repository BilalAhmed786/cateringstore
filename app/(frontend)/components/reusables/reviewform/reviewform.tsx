"use client";

import { FieldValues } from "react-hook-form";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";

interface ReviewFormProps {
  onSubmit: (data: FieldValues) => void | Promise<void>;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const fields: FieldConfig[] = [
    {
      name: "rating",
      label: "Rating",
      type: "rating",
      className:"mt-2",
      required: true,
    },
    {
      name: "comment",
      label: "Comment",
      type: "textarea",
      className:"p-2 mt-2",
      placeholder: "Write your review...",
      required: true,
    },
  ];

  return (
    <DynamicShadcnForm
      fields={fields}
      cardTitle="Write a Review"
      cardDescription="Share your experience with this item"
      defaultvalues={{
        rating: 0,
        comment: "",
      }}
      showreset={false}
      reset="Reset"
      submitLabel="Submit Review"
      onSubmit={onSubmit}
    />
  );
}