// components/reusables/DynamicFormFields.tsx
"use client";
import { Input } from "@/app/(frontend)/components/ui/input";
import { Textarea } from "@/app/(frontend)/components/ui/textarea";
import { DynamicFormFieldsProps } from "../types/type";

export function DynamicFormFields({
  fields,
  register,
  errors,
}: DynamicFormFieldsProps) {
  return (
    <div className="space-y-4 mt-5">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type === "textarea" ? (
            <Textarea className="h-24" {...register(field.name)} placeholder={field.label} />
          ) : (
            <Input
              {...register(field.name)}
              type={field.type === "number" ? "number" : "text"}
              placeholder={field.label}
            />
          )}
          {errors[field.name as keyof typeof errors] && (
            <p className="text-sm text-red-500">
              {errors[field.name as keyof typeof errors]?.message as string}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
