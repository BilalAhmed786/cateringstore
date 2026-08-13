// app/api/admin/menu-items/[id]/route.ts
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
      },
    });

    if (!menuItem) {
      return NextResponse.json(
        { message: "Menu item not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(menuItem);
  } catch (error) {
    console.error("Menu item details error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch menu item",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await requireRole(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { id } = await params;
  const { title, description, price, categoryId, status } = body;

  const updated = await prisma.menuItem.update({
    where: { id },
    data: {
      title,
      description,
      price: Number(price),
      categoryId,
      available: Boolean(status),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;

    // 1 Fetch all image publicIds
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        images: {
          select: { publicId: true },
        },
      },
    });

    if (!menuItem) {
      return NextResponse.json(
        { message: "Menu item not found" },
        { status: 404 },
      );
    }

    // 2 Delete all images from Cloudinary
    if (menuItem.images.length > 0) {
      await Promise.all(
        menuItem.images.map((img) => cloudinary.uploader.destroy(img.publicId)),
      );
    }

    // 3 Delete menu item (MenuItemImage auto-deleted by cascade)
    await prisma.menuItem.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Menu item and all images deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;
    const body = await req.json();
    const { available } = body;

    if (typeof available !== "boolean") {
      return NextResponse.json(
        { error: "available must be boolean" },
        { status: 400 },
      );
    }

    const updatedItem = await prisma.menuItem.update({
      where: { id },
      data: { available },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}


