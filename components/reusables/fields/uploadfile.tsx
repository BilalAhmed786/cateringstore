"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

interface FileUploadInputProps {
  name: string;
  label: string;
  accept?: string;
  multiple?: boolean;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  name,
  label,
  accept = "image/*",
  multiple = false,
}) => {
  const { control } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = useCallback(
    (
      files: FileList | null,
      onChange: ControllerRenderProps<FieldValues, string>["onChange"],
    ) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      onChange(multiple ? fileArray : fileArray[0]);

      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviews(multiple ? (prev) => [...prev, ...urls] : urls);
    },
    [multiple],
  );

  const removeFile = (
    index: number,
    onChange: ControllerRenderProps<FieldValues, string>["onChange"],
    value: File | File[],
  ) => {
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
  };

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
          <label className="block mb-2 font-medium">{label}</label>

          <div
            className="border-2 border-dashed rounded-lg p-4 cursor-pointer"
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

            <input
              id={name}
              type="file"
              accept={accept}
              multiple={multiple}
              hidden
              onChange={(e) => handleFiles(e.target.files, field.onChange)}
            />

            {previews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {previews.map((src, index) => (
                  <div key={src} className="relative">
                    <Image
                      src={src}
                      alt="preview"
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index, field.onChange, field.value);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {previews.length === 0 && fieldState.error && (
            <p className="text-red-500 mt-2">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default FileUploadInput;
