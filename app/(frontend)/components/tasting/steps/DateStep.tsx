"use client";

import { useFormContext } from "react-hook-form";
import { Clock } from "lucide-react";
import Metadata from "@/app/(frontend)/components/reusables/metadata/metadata";
import { timeSlots } from "../constants";
import { TastingFormValues } from "../type";

export default function DateStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TastingFormValues>();

  const selectedTime = watch("time");

  return (
    <div>
      <Metadata
        title="When would you like to visit?"
        desc="Choose your preferred tasting date and time."
        classname=""
      />

      {/* Date */}

      <div className="mt-7">
        <label className="text-sm font-medium">
          Preferred Date
        </label>

        <input
          type="date"
          {...register("date", {
            required: "Please select a date.",
          })}
          min={new Date().toISOString().split("T")[0]}
          className="mt-2 h-11 w-full rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-primary"
        />

        {errors.date && (
          <p className="mt-2 text-sm text-destructive">
            {errors.date.message}
          </p>
        )}
      </div>

      {/* Time */}

      <div className="mt-7">
        <div className="mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />

          <label className="text-sm font-medium">
            Preferred Time
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {timeSlots.map((time) => {
            const selected = selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() =>
                  setValue("time", time, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`rounded-xl border p-4 text-center text-sm font-medium transition-all ${
                  selected
                    ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                    : "hover:border-primary/50 hover:bg-muted"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>

        {errors.time && (
          <p className="mt-2 text-sm text-destructive">
            Please select a tasting time.
          </p>
        )}
      </div>
    </div>
  );
}