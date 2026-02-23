import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // This will automatically delete related PackageItems
    await prisma.package.delete({ where: { id } });

    return NextResponse.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("DELETE Package error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete package",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole(req, ["admin"]);

    const { id } = await params;
    const body = await req.json();
    const { available } = body;

    console.log(available)

    // Check if package exists
    const existing = await prisma.package.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    // Update availability
    const updated = await prisma.package.update({
      where: { id },
      data: { available },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH Package error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to toggle package" },
      { status: 500 }
    );
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = await params
    const packageData = await prisma.package.findUnique({
      where: id,
      include: {
        items: {
          include: {
            menuItem: {
              select: {
                id: true,
                title: true,
                price: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!packageData) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(packageData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch package details" },
      { status: 500 }
    );
  }
}
