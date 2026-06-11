import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


type TogglePayload = {
  available: boolean;
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    
   const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;
   
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }

    const body = (await req.json()) as TogglePayload;

    if (typeof body.available !== "boolean") {
      return NextResponse.json(
        { message: "`available` must be boolean" },
        { status: 400 }
      );
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        available: body.available,
      },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("TOGGLE EVENT ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to toggle event status",
      },
      { status: 500 }
    );
  }
}