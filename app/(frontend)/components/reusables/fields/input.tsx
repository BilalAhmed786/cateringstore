"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { TextInputProps } from "../types/types";

const Inputtext: React.FC<TextInputProps> = ({
  name,
  label,
  className,
  placeholder,
  type,
}) => {
  const { control } = useFormContext();

  return (
    <div>
      {type !== "hidden" && (
        <Label htmlFor={name}>
          {label ?? ""}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Input
              {...field}
              value={field.value ?? ""}
              id={name}
              className={className}
              type={type}
              placeholder={placeholder}
            />

            {type !== "hidden" && fieldState.error && (
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

export default Inputtext;