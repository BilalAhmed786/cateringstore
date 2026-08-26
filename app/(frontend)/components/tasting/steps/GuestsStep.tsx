"use client";

import { useFormContext } from "react-hook-form";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { guestOptions } from "../constants";
import { TastingFormValues } from "../type";

export default function GuestsStep() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TastingFormValues>();

  const selectedGuests = watch("guests");

  return (
    <div>
      <Metadata
        title="How many guests are you expecting?"
        desc="This helps us understand the size of your event."
        classname=""
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {guestOptions.map((option) => {
          const selected = selectedGuests === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() =>
                setValue("guests", option, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              className={`rounded-xl border p-4 text-left text-sm font-medium transition-all ${
                selected
                  ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                  : "hover:border-primary/50 hover:bg-muted"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {errors.guests && (
        <p className="mt-2 text-sm text-destructive">
          Please select your expected guest count.
        </p>
      )}
    </div>
  );
}