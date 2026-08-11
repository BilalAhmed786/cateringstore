import { z } from "zod";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";

export const generateSchema = (fields: FieldConfig[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    const isRequired = field.required !== false;

    switch (field.type) {
      /* ================= EMAIL ================= */
      case "email": {
        const base = z.string().email("Invalid email format");

        shape[field.name] = isRequired
          ? base.nonempty(`${field.label} is required`)
          : base.optional();

        break;
      }

      /* ================= PASSWORD ================= */
      case "password": {
        const base = z
          .string()
          .min(6, "Password must be at least 6 characters");

        shape[field.name] = isRequired
          ? base.nonempty(`${field.label} is required`)
          : base.optional();

        break;
      }

      /* ================= TEXT TYPES ================= */
      case "text":
      case "hidden":
      case "textarea":
      case "select":
      case "radio":
      case "date": {
        const base = z.string();

        shape[field.name] = isRequired
          ? base.min(1, `${field.label} is required`)
          : base.optional();

        break;
      }

      /* ================= NUMBER ================= */
      case "number": {
        const base = z.coerce
          .number()
          .min(1, `${field.label} must be greater than 0`);

        shape[field.name] = isRequired ? base : base.optional();

        break;
      }

      /* ================= CHECKBOX ================= */
      case "checkbox": {
        shape[field.name] = z.boolean().optional();
        break;
      }

      /* ================= FILE ================= */
      case "file": {
        const base = z
          .array(z.instanceof(File))
          .optional()
          .refine(
            (files) =>
              !files ||
              files.length === 0 ||
              files.every((f) => f.type.startsWith("image/")),
            "Only image files allowed",
          )
          .refine(
            (files) =>
              !files ||
              files.length === 0 ||
              files.every((f) => f.size <= 2 * 1024 * 1024),
            "Each file must be ≤ 2MB",
          );

        shape[field.name] = isRequired
          ? base.refine((files) => files && files.length > 0, {
              message: `${field.label} is required`,
            })
          : base;

        break;
      }

      /* ================= IMAGE PREVIEW (NO VALIDATION) ================= */
      case "imagepreview": {
        // NOT a form input → ignore validation
        break;
      }
      case "rating": {
        shape[field.name] = z.coerce
          .number()
          .min(1, `${field.label} must be greater than 0`)
          .max(5, `${field.label} not greater than 5`);

        break;
      }

      default:
        break;
    }
  });

  return z.object(shape);
};
