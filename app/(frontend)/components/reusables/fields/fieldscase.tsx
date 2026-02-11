"use client";
import React from "react";
import TextInput from "./input";
import SelectInput from "./select";

import ImageUploadInput from "./uploadfile";
import { FieldProps } from "../types/types";
import { ImagePreviewField } from "./imagespreview";

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

    case "imagepreview":
      return (
        <ImagePreviewField
          images={field.images || []}
          isDeleting={field.isDeleting}
          onDelete={field.onDelete || (() => {})}
        />
      );
 
    default:
      return null;
  }
};
