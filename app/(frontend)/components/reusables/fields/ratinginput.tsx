"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Star } from "lucide-react";

interface RatingInputProps {
  name: string;
  label?: string;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  name,
  label,
}) => {
  const { control } = useFormContext();

  return (
    <div>
      {label && <label>{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => field.onChange(rating)}
                >
                  <Star
                    className={`h-5 w-5 ${
                      rating <= (Number(field.value) || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>

            {fieldState.error && (
              <p className="mt-2 text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};