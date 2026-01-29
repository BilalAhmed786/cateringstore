export type FieldConfig = {
  type: "email" | "password" |"text" | "number" | "select" | "checkbox" | "radio" | "date" | "file" | "textarea";
  name: string;
  label: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  accept?: string;
  multiple?: boolean
};