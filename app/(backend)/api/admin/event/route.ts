import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Role check
  const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  try {
    const body = await req.json();

    const {
      name,
      description,
      menuItems = [],
      packages = [],
    } = body;

    // Validation
    if (!name) {
      return NextResponse.json(
        { error: "Event name is required" },
        { status: 400 }
      );
    }

    if (!menuItems.length && !packages.length) {
      return NextResponse.json(
        { error: "Select at least one menu item or package" },
        { status: 400 }
      );
    }

    // Create event with relations
    const newEvent = await prisma.event.create({
      data: {
        name,
        description: description ?? null,
        menuItems: {
          create: menuItems.map((m: { menuItemId: string }) => ({
            menuItemId: m.menuItemId,
          })),
        },
        packages: {
          create: packages.map((p: { packageId: string }) => ({
            packageId: p.packageId,
          })),
        },
      },
      include: {
        menuItems: true,
        packages: true,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   const events = await prisma.event.findMany({
//     orderBy: { createdAt: "desc" },
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       status: true,
//       createdAt: true,
//     },
//   });

//   return NextResponse.json(events);
// }

