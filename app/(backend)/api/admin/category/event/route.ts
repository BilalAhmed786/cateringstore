import { NextRequest, NextResponse } from "next/server";

import { UploadApiResponse } from "cloudinary";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { Prisma } from "@prisma/client";

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
    let publicId: string | null = null;

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "cateringstore/categories/event",
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

      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    const eventCategory = await prisma.eventCategory.create({
      data: {
        name,
        image: imageUrl,
        publicId,
      },
    });

    return NextResponse.json(eventCategory, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
 
 try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const search = searchParams.get("search") ?? "";

    const skip = (page - 1) * limit;

    const where:Prisma.EventCategoryWhereInput = search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {};

    const [categories, total] = await Promise.all([
      prisma.eventCategory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.eventCategory.count({ where }),
    ]);

    return NextResponse.json({
      categories,
      total,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch hamper categories" },
      { status: 500 }
    );
  }
}