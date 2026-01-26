"use client"
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";

interface SelectInputProps {
  name: string;
  label: string;
  options?: { label: string; value: string }[];
}

const Selectinput: React.FC<SelectInputProps> = ({ name, label, options }) => {
  const { control } = useFormContext();

  return (
    <div>
      <Label className="mb-2" htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
         return (
            <>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <SelectTrigger
                  className={fieldState.error ? "border-red-500" : ""}
                >
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.error && (
                <p className="text-red-500 text-sm mt-2">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default Selectinput;