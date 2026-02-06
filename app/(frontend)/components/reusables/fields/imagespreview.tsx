// components/reusables/form-fields/ImagePreviewField.tsx
import Image from "next/image";
import { UniButton } from "../button/button";
import { ImagePreviewFieldProps } from "../types/types";

export function ImagePreviewField({
  images,
  onDelete,
  isDeleting,
}: ImagePreviewFieldProps) {
  if (!images?.length) return null;

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">Existing Images</p>

      <div className="flex flex-wrap gap-5">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative group w-[150] h-[150] overflow-hidden rounded"
          >
            <Image src={img.url} alt="preview" fill className="object-cover" />

            <UniButton
              type="button"
              label="✕"
              disabled={isDeleting}
              className="absolute top-0 right-0 w-6 h-6 p-0 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100"
              onClick={() => onDelete(img.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
