import { z } from "zod";
import { FieldConfig } from "@/components/reusables/types/types";

export const generateSchema = (fields: FieldConfig[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    switch (field.type) {
      case "email":
        shape[field.name] = z
          .string(`${field.label} is required`)
          .nonempty(`${field.label} is required`)
          .email("Invalid email format");
        break;

      case "password":
        shape[field.name] = z
          .string(`${field.label} is required`)
          .nonempty(`${field.label} is required`)
          .min(6, "Password must be at least 6 characters");
        break;

      case "select":
      case "text":
      case "textarea":
      case "date":
      case "radio":
        shape[field.name] = z
          .string(`${field.label} is required`)
          .min(1, `${field.label} is required`)
          .nonempty(`${field.label} is required`);
        break;

      case "number":
        shape[field.name] = z.coerce.number().min(1);
        break;

      case "checkbox":
        shape[field.name] = z.boolean();
        break;

      case "file":
        if (field.multiple) {
          shape[field.name] = z
            .array(z.instanceof(File))
            .nonempty(`${field.label} is required`)
            .refine(
              (files) => files.every((f) => f.type.startsWith("image/")),
              "Only image files are allowed"
            )
            .refine(
              (files) => files.every((f) => f.size <= 2 * 1024 * 1024),
              "Each file must be <= 2MB"
            );
        } else {
          shape[field.name] = z
            .instanceof(File, {message: `${field.label} is required`} )
            .refine(
              (f) => f.type.startsWith("image/"),
              "Only image files are allowed"
            )
            .refine((f) => f.size <= 2 * 1024 * 1024, "File must be <= 2MB");
        }
        break;
    }
  });

  return z.object(shape);
};