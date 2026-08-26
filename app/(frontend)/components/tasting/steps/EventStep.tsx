"use client";

import { useFormContext } from "react-hook-form";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { eventTypes } from "../constants";
import { TastingFormValues } from "../type";

type EventStepProps = {
  onNext?: () => void;
};

export default function EventStep({}: EventStepProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TastingFormValues>();

  const selectedEvent = watch("eventType");

  return (
    <div>
      <Metadata
        title="What type of event are you planning?"
        desc="Choose the option that best describes your event."
        classname=""
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {eventTypes.map((type) => {
          const selected = selectedEvent === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() =>
                setValue("eventType", type, {
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
              {type}
            </button>
          );
        })}
      </div>

      {errors.eventType && (
        <p className="mt-2 text-sm text-destructive">
          Please select an event type.
        </p>
      )}
    </div>
  );
}