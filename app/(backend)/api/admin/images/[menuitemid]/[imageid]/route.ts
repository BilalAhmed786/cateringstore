import { NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";


export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ menuitemid: string; imageid: string }>;
  }
) {
  try {
    const userOrResponse = await requireRole(req, ["ADMIN"]);
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { menuitemid, imageid } = await params;
// console.log(menuitemid)
// console.log(imageid)
    if (!menuitemid || !imageid) {
      return NextResponse.json(
        { message: "Invalid parameters" },
        { status: 400 }
      );
    }

    // 1️⃣ Find image in DB
    const image = await prisma.menuItemImage.findFirst({
      where: {
        id: imageid,
        menuItemId:menuitemid,
      },
    });

    if (!image) {
      return NextResponse.json(
        { message: "Image not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Delete from Cloudinary
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    // 3️⃣ Delete from DB
    await prisma.menuItemImage.delete({
      where: {
        id: image.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE IMAGE ERROR:", error);

    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 }
    );
  }
}
