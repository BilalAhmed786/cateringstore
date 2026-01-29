"use client"
import React from "react";
import TextInput from "./input";
import SelectInput from "./select";
import ImageUploadInput from "./uploadfile";
import { FieldConfig } from "../types/types";

interface FieldProps {
  field: FieldConfig;
}

export const FormField: React.FC<FieldProps> = ({ field }) => {
  switch (field.type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "radio":
    case "date":
    case "textarea":
    case "checkbox":
      return <TextInput {...field} />;

    case "select":
      return <SelectInput {...field} />;

    case "file":
      return <ImageUploadInput {...field} />;

    default:
      return null;
  }
};