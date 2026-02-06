import { NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";
import prisma from "@/app/(backend)/lib/prisma/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ menuitemid: string }> }
) {
  try {
     const userOrResponse = await requireRole(req, ["ADMIN"]);
     
     if (userOrResponse instanceof NextResponse) return userOrResponse;

    const {menuitemid } = await params;
  
    const formData = await req.formData();
    const images = formData.getAll("images") as File[];

    if (!menuitemid || images.length === 0) {
      throw new Error("Invalid data");
    }

    const uploadedImages = [];

    for (const file of images) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "cateringstore/menuitem",
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

      uploadedImages.push({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        menuItemId:menuitemid,
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
      { status: 400 }
    );
  }
}
