import { NextRequest, NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";



export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const formData = await req.formData();
    const file = formData.get("image");
    const id = formData.get("packageId") as string;

    if (!id) {
      return NextResponse.json({ message: "packageId missing" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Image is required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
   const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "cateringstore/package" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result as UploadApiResponse);
        }
      ).end(buffer);
    });

    const updated = await prisma.package.update({
      where: { id },
      data: {
        image: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      },
    });

    return NextResponse.json({ success: true, image: updated.image });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { message: "Image upload failed", error: String(error) },
      { status: 500 }
    );
  }
}