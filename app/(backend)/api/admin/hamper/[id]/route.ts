import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Hamper ID is required" },
        { status: 400 }
      );
    }

    const hamper = await prisma.hamper.findUnique({
      where: { id },
      include: {
        event: true,
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    if (!hamper) {
      return NextResponse.json(
        { message: "Hamper not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(hamper);
  } catch (error) {
    console.error("Hamper details error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch hamper",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(req: NextRequest) {
  try {
    // Only admin can toggle
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const body = await req.json() as { id: string; available: boolean };
    const { id, available } = body;

    if (!id) {
      return NextResponse.json({ message: "Hamper ID is required" }, { status: 400 });
    }

    const hamper = await prisma.hamper.update({
      where: { id },
      data: { available: !available }, // toggle
    });

    return NextResponse.json(hamper, { status: 200 });
  } catch (error) {
    console.error("Toggle Hamper Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to toggle hamper" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }>}) {
  try {
    const { id } = await params;

    await prisma.hamper.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Hamper deleted successfully" });
  } catch (error) {
    console.error("Delete Hamper Error:", error);
    return NextResponse.json(
      { message: "Failed to delete hamper" },
      { status: 500 }
    );
  }
}