import { NextRequest, NextResponse } from "next/server";

import { UploadApiResponse } from "cloudinary";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
     const {id}  = await params
     const userOrResponse = await requireRole(req, ["ADMIN"]);
     if (userOrResponse instanceof NextResponse) return userOrResponse;

  try {
    const formData = await req.formData();

    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const category = await prisma.menuCategory.findUnique({
      where: { id },
    });


    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // ==============================
    // 1. DELETE OLD IMAGE (IMPORTANT)
    // ==============================
    if (category.publicId) {
      await cloudinary.uploader.destroy(category.publicId);
    }

    // ==============================
    // 2. UPLOAD NEW IMAGE
    // ==============================
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "cateringstore/categories/menu",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as UploadApiResponse);
            }
          )
          .end(buffer);
      }
    );

    // ==============================
    // 3. UPDATE DB
    // ==============================
    const updated = await prisma.menuCategory.update({
      where: { id },
      data: {
        image: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Image update failed" },
      { status: 500 }
    );
  }
}