import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userOrResponse = await requireRole(req, ["ADMIN"]);
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true,

        // IMPORTANT for edit page
        menuItems: {
          include: {
            menuItem: {
              include: {
                images: true
              },
            },
          },
        },

        packages: {
          include: {
            package: true,
          },
        },

        reviews: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("GET EVENT ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch event",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  const { id } = await params;

  try {
    const body = await req.json();

    const { name, description, categoryId, menuItems, packages } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: " All fileds are required" },
        { status: 400 },
      );
    }

    const updatedEvent = await prisma.$transaction(async (tx) => {
      const event = await tx.event.update({
        where: { id },
        data: {
          name,
          description: description ?? null,
          categoryId,
        },
      });

      if (Array.isArray(menuItems)) {
        await tx.eventMenuItem.deleteMany({
          where: { eventId: id },
        });

        if (menuItems.length > 0) {
          await tx.eventMenuItem.createMany({
            data: menuItems.map((item) => ({
              eventId: id,
              menuItemId: item.menuItemId,
              quantity: item.quantity,
            })),
          });
        }
      }

      // 3️⃣ Update Packages (if provided)
      if (Array.isArray(packages)) {
        await tx.eventPackage.deleteMany({
          where: { eventId: id },
        });

        if (packages.length > 0) {
          await tx.eventPackage.createMany({
            data: packages.map((pkg) => ({
              eventId: id,
              packageId: pkg.packageId,
              quantity: pkg.quantity,
            })),
          });
        }
      }

      return event;
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userOrResponse = await requireRole(req, ["ADMIN"]);
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: { id },
      select: { publicId: true },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    if (event.publicId) {
      try {
        await cloudinary.uploader.destroy(event.publicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary delete failed:", cloudinaryError);
      }
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to delete event",
      },
      { status: 500 },
    );
  }
}
