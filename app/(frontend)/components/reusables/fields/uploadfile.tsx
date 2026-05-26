"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Controller,
  ControllerRenderProps,
  useFormContext,
} from "react-hook-form";
import { Input } from "../../ui/input";
import { UniButton } from "../button/button";
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

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const handleFiles = useCallback(
    (
      files: FileList | null,
      onChange: ControllerRenderProps<File[]>["onChange"]
    ) => {
      if (!files) return;

      const fileArray = Array.from(files);

     
      onChange(fileArray);

      
      if (fileArray.length && onUpload) {
        onUpload(fileArray);
      }

      const urls = fileArray.map((file) =>
        URL.createObjectURL(file)
      );

      setPreviews((prev) =>
        multiple ? [...prev, ...urls] : urls
      );
    },
    [multiple, onUpload]
  );

  const removeFile = (
    index: number,
    onChange: ControllerRenderProps<File[]>["onChange"],
    value: File[]
  ) => {
    const updated = Array.isArray(value)
      ? value.filter((_, i) => i !== index)
      : [];

    onChange(updated);

    URL.revokeObjectURL(previews[index]);

    setPreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // cleanup URLs
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]} 
      render={({ field, fieldState }) => (
        <div className="form-group">
          <Label className="mb-2">{label}</Label>

          {/* Drag & Drop */}
          <div
            className={
              dragdrop ||
              "border-2 border-dashed rounded-lg p-4 cursor-pointer"
            }
            onClick={() =>
              document.getElementById(name)?.click()
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(
                e.dataTransfer.files,
                field.onChange
              );
            }}
          >
            <p className="text-sm text-gray-500 text-center">
              Drag & drop {multiple ? "files" : "file"} or click
              to upload
            </p>

            {/* Hidden Input */}
            <Input
              id={name}
              type="file"
              accept={accept}
              multiple={multiple}
              className="hidden"
              onChange={(e) =>
                handleFiles(e.target.files, field.onChange)
              }
            />

            {/* PREVIEWS */}
            {mounted && previews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {previews.map((src, index) => (
                  <div key={src} className={className}>
                    <Image
                      src={src}
                      alt="preview"
                      width={200}
                      height={200}
                      style={{ objectFit: "cover" }}
                    />

                    <UniButton
                      type="button"
                      className="absolute z-50 -top-2 w-6 h-6 p-0 text-xs rounded-full bg-red-500 text-white"
                      label="✕"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(
                          index,
                          field.onChange,
                          field.value || []
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {fieldState.error && (
            <p className="text-red-500 mt-2">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FileUploadInput;