import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  try {
    const { id } = await params;

    const category = await prisma.hamperCategory.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Hamper category not found" },
        { status: 404 }
      );
    }
    if (category.publicId) {
      await cloudinary.uploader.destroy(category.publicId);
    }

    await prisma.hamperCategory.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Hamper category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
 
 const {id} = await params

 try {
    const category = await prisma.hamperCategory.findUnique({
      where: { id },
 });

    if (!category) {
      return NextResponse.json(
        { message: "Hamper category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch hamper category" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;
  const {id} = await params
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.hamperCategory.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update hamper category" },
      { status: 500 }
    );
  }
}