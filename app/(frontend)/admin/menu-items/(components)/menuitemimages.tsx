"use client";
import Image from "next/image";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

type Props = {
  images: { id: string; url: string }[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
};

export default function MenuItemExistingImages({
  images,
  onDelete,
  isDeleting,
}: Props) {
  if (!images?.length) return null;

  return (
    <div>
      <h3 className="font-semibold mb-2">Existing Images</h3>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative">
            <Image
              src={img.url}
              alt=""
              width={200}
              height={200}
              className="rounded object-cover"
            />

            <UniButton
              type="button"
              loading={isDeleting}
              label="✕"
              className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 p-0"
              onClick={() => onDelete(img.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
