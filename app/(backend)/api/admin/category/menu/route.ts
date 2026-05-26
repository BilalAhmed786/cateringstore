import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";

export async function POST(req: NextRequest) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
      if (userOrResponse instanceof NextResponse) return userOrResponse;
 try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File | null;

    

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;
    let publicId:string | null = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
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

      });
       
      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    const category = await prisma.menuCategory.create({
      data: {
        name,
        image: imageUrl,
        publicId:publicId
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }

}

export async function GET() {
  try {
    const categories = await prisma.menuCategory.findMany({
      select:{id:true,name:true},
      orderBy: {
        createdAt: "desc",
      },
      
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu categories" },
      { status: 500 }
    );
  }
}


 