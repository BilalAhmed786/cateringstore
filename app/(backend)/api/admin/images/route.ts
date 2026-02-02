import { NextResponse } from "next/server";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import type { UploadApiResponse } from "cloudinary";
export async function POST(req: Request) {
  try {
    await requireRole(req, ["admin"]);

    const formData = await req.formData();
    const menuItemId = formData.get("menuItemId") as string;
    const images = formData.getAll("images") as File[];

    if (!menuItemId || images.length === 0) {
      throw new Error("Invalid data");
    }

    const uploadedImages = [];

    for (const file of images) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "cateringstore/menuitem", resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as UploadApiResponse);
              },
            )
            .end(buffer);
        },
      );

      uploadedImages.push({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        menuItemId,
      });
    }

    await prisma.menuItemImage.createMany({
      data: uploadedImages,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Image upload failed" },
      { status: 400 },
    );
  }
}
