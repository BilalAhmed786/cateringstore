"use client";
import React from "react";
import TextInput from "./input";
import SelectInput from "./select";

import ImageUploadInput from "./uploadfile";
import { FieldProps } from "../types/types";
import { ImagePreviewField } from "./imagespreview";
import { RatingInput } from "./ratinginput";

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
    case "hidden":
      return <TextInput {...field} />;

    case "select":
      return <SelectInput {...field} />;

    case "file":
      return <ImageUploadInput {...field} />;

    case "imagepreview":
      return (
        <ImagePreviewField
          images={field.images || []}
          image={field.image}
          isDeleting={field.isDeleting}
          onDelete={field.onDelete || (() => {})}
        />
      );
    case "rating":
      return <RatingInput {...field} />;
    default:
      return null;
  }
};
