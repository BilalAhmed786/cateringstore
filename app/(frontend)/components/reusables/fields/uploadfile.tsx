"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Input } from "../../ui/input"; // reusable Input
import { UniButton } from "../button/button"; // reusable Button
import { Label } from "../../ui/label";
import { FileUploadInputProps } from "../types/types";



const FileUploadInput: React.FC<FileUploadInputProps> = ({
  name,
  label,
  accept = "image/*",
  multiple = false,
  className,
  dragdrop,
  onUpload,
}) => {
  const { control } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // avoid SSR mismatch
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // handle selected files
  const handleFiles = useCallback(
    (
      files: FileList | null,
      onChange: ControllerRenderProps<FieldValues, string>["onChange"],
    ) => {
      if (!files || files.length === 0) return;
       const fileArray = Array.from(files);
       onChange(multiple ? fileArray : fileArray[0]);
      // call onUpload callback if provided
    if (fileArray.length && onUpload) {
      onUpload(fileArray); 
    }

      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(multiple ? (prev) => [...prev, ...urls] : urls);
    },
    [multiple,onUpload],
  );

  // remove a file
  const removeFile = (
    index: number,
    onChange: ControllerRenderProps<FieldValues, string>["onChange"],
    value: File | File[],
  ) => {
    const inputEl = document.getElementById(name) as HTMLInputElement | null;

    if (multiple && Array.isArray(value)) {
      const updatedFiles = value.filter((_, i) => i !== index);
      onChange(updatedFiles);

      URL.revokeObjectURL(previews[index]);
      setPreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      onChange(null);
      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews([]);
    }

    // Reset the input so the same file can be re-selected
    if (inputEl) inputEl.value = "";
  };

  // cleanup object URLs
  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      render={({ field, fieldState }) => (
        <div className="form-group">
          <Label className="mb-2">{label}</Label>

          {/* Drag & drop area */}
          <div
            className={
              dragdrop || "border-2 border-dashed rounded-lg p-4 cursor-pointer"
            }
            onClick={() => document.getElementById(name)?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files, field.onChange);
            }}
          >
            <p className="text-sm text-gray-500 text-center">
              Drag & drop {multiple ? "files" : "file"} or click to upload
            </p>

            {/* Hidden input using reusable Input */}
            <Input
              id={name}
              type="file"
              accept={accept}
              multiple={multiple}
              className="hidden"
              onChange={(e) => handleFiles(e.target.files, field.onChange)}
            />

            {/* Previews */}
            {mounted && previews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {previews.map((src, index) => (
                  <div key={src} className={className}>
                    <Image
                      src={src}
                      alt="preview"
                      width={200} // in pixels
                      height={200} // in pixels
                      style={{ objectFit: "cover" }}
                    />
                    <UniButton
                      type="button"
                      className="absolute z-50 -top-2 -right-2 w-6 h-6 p-0 text-xs rounded-full bg-red-500 text-white"
                      label="✕"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index, field.onChange, field.value);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {previews.length === 0 && fieldState.error && (
            <p className="text-red-500 mt-2">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FileUploadInput;
