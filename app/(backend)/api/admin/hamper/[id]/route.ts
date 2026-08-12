import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { HamperBody } from "../types/types";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // ---------------------------------------
    // Validate ID
    // ---------------------------------------

    if (!id) {
      return NextResponse.json(
        { message: "Hamper ID is required" },
        { status: 400 },
      );
    }

    // ---------------------------------------
    // Get hamper
    // ---------------------------------------

    const hamper = await prisma.hamper.findUnique({
      where: {
        id,
      },
      include: {
        category: true,

        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },

          orderBy: {
            createdAt: "desc",
          },
        },

        items: {
          include: {
            menuItem: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    if (!hamper) {
      return NextResponse.json(
        { message: "Hamper not found" },
        { status: 404 },
      );
    }

    // ---------------------------------------
    // Calculate rating
    // ---------------------------------------

    const totalReviews = hamper.reviews.length;

    const averageRating =
      totalReviews > 0
        ? hamper.reviews.reduce(
            (sum, review) => sum + review.rating,
            0,
          ) / totalReviews
        : 0;

    // ---------------------------------------
    // Calculate total items
    // ---------------------------------------

    const totalItems = hamper.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );

    // ---------------------------------------
    // Check review permission
    // ---------------------------------------

    let canReview = false;

    const user = await getCurrentUser(req);
    if (user) {
      // Check whether user purchased and received hamper
      const purchased = await prisma.orderHamper.findFirst({
        where: {
          hamperId: id,

          order: {
            userId: user.id,
            status: "DELIVERED",
          },
        },
      });

      // Check whether user already reviewed hamper
      const alreadyReviewed =
        await prisma.hamperReview.findUnique({
          where: {
            userId_hamperId: {
              userId: user.id,
              hamperId: id,
            },
          },
        });

      canReview =  !!purchased && !alreadyReviewed;
    }

    // ---------------------------------------
    // Response
    // ---------------------------------------

    return NextResponse.json({
      ...hamper,

      totalItems,

      averageRating: Number(averageRating.toFixed(1)),

      totalReviews,

      totalComments: totalReviews,

      canReview,
    });
  } catch (error) {
    console.error("Hamper details error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch hamper", 
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Only admin can toggle
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const body = (await req.json()) as { id: string; available: boolean };
    const { id, available } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Hamper ID is required" },
        { status: 400 },
      );
    }

    const hamper = await prisma.hamper.update({
      where: { id },
      data: { available: !available }, // toggle
    });

    return NextResponse.json(hamper, { status: 200 });
  } catch (error) {
    console.error("Toggle Hamper Error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to toggle hamper",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;
    const body = (await req.json()) as HamperBody;

    const { name, description, discount = 0, items } = body;

    if (!name || !items?.length) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    /* ---------------- GET MENU ITEM PRICES ---------------- */
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: items.map((i) => i.menuItemId) } },
      select: { id: true, price: true },
    });

    /* ---------------- CALCULATE PRICE ---------------- */
    const originalPrice = items.reduce((sum, item) => {
      const menu = menuItems.find((m) => m.id === item.menuItemId);
      return sum + (menu?.price || 0) * item.quantity;
    }, 0);

    const finalPrice = originalPrice - (originalPrice * discount) / 100;

    /* ---------------- UPDATE HAMPER ---------------- */
    const updatedHamper = await prisma.hamper.update({
      where: { id },
      data: {
        name,
        description,
        originalPrice,
        discountType: discount > 0 ? "PERCENTAGE" : null,
        discountValue: discount,
        finalPrice,

        items: {
          deleteMany: {}, // remove old items
          create: items.map((i) => ({
            menuItemId: i.menuItemId,
            quantity: i.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(updatedHamper);
  } catch (error) {
    console.error("Update Hamper Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to update hamper",
      },
      { status: 500 },
    );
  }
}
