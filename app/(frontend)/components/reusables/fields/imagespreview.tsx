// components/reusables/form-fields/ImagePreviewField.tsx

import Image from "next/image";
import { UniButton } from "../button/button";

type ImageItem = {
  id: string;
  url: string;
};

type Props = {
  images?: ImageItem[];  
  image?: string | null;     
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
};

export function ImagePreviewField({
  images,
  image,
  onDelete,
  isDeleting,
}: Props) {

  const normalizedImages: ImageItem[] = images?.length
    ? images
    : image
    ? [{ id: "single-image", url: image }]
    : [];

  if (!normalizedImages.length) return null;

  return (
    <div className="space-y-4">
      <p className="font-medium text-sm">Existing Image</p>

      <div className="flex gap-5 flex-wrap">
        {normalizedImages.map((img) => (
          <div
            key={img.id}
            className="relative group w-40 h-40 rounded overflow-hidden"
          >
            <Image
              src={img.url}
              alt="preview"
              fill
              className="cover"
            />

            {onDelete && img.id !=="single-image" &&(
              <UniButton
                type="button"
                label="✕"
                disabled={isDeleting}
                className="absolute top-2 right-2 w-6 h-6 p-0 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100"
                onClick={() => onDelete(img.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}