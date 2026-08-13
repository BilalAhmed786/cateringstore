import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";
import { EventBody } from "../types/type";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 },
      );
    }

    // ---------------------------------------
    // Get event
    // ---------------------------------------

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        category: true,

        menuItems: {
          include: {
            menuItem: {
              include: {
                images: true,
              },
            },
          },
        },

        packages: {
          include: {
            package: true,
          },
        },

        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 },
      );
    }

    // ---------------------------------------
    // Calculate rating
    // ---------------------------------------

    const totalReviews = event.reviews.length;

    const averageRating =
      totalReviews > 0
        ? event.reviews.reduce(
            (sum, review) => sum + review.rating,
            0,
          ) / totalReviews
        : 0;

    // ---------------------------------------
    // Check review permission
    // ---------------------------------------

    let canReview = false;

    const user = await getCurrentUser(req);

    if (user) {
      // Has the user purchased this event
      // and has the order been delivered?
      const purchased = await prisma.orderEvent.findFirst({
        where: {
          eventId: id,
          order: {
            userId: user.id,
            status: "DELIVERED",
          },
        },
      });

      // Has the user already reviewed this event?
      const alreadyReviewed =
        await prisma.eventReview.findUnique({
          where: {
            userId_eventId: {
              userId: user.id,
              eventId: id,
            },
          },
        });

      canReview = Boolean(purchased && !alreadyReviewed);
    }

    // ---------------------------------------
    // Response
    // ---------------------------------------

    return NextResponse.json({
      ...event,

      averageRating,
      totalReviews,
      totalComments: totalReviews,

      // false for guests
      // true only if authenticated + purchased + not reviewed
      canReview,
    });
  } catch (error) {
    console.error("GET EVENT ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch event",
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
    const body = (await req.json()) as EventBody;

    const {
      name,
      description,
      categoryId,
      discount = 0,
      menuItems = [],
      packages = [],
    } = body;

    if (!name || (!menuItems.length && !packages.length)) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    /* -------------------- GET MENU ITEM PRICES -------------------- */

    const dbMenuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItems.map((item) => item.menuItemId),
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    /* -------------------- GET PACKAGE PRICES -------------------- */

    const dbPackages = await prisma.package.findMany({
      where: {
        id: {
          in: packages.map((item) => item.packageId),
        },
      },
      select: {
        id: true,
        finalPrice: true,
      },
    });

    /* -------------------- CALCULATE ORIGINAL PRICE -------------------- */

    const menuTotal = menuItems.reduce((sum, item) => {
      const menu = dbMenuItems.find((m) => m.id === item.menuItemId);

      return sum + (menu?.price ?? 0) * item.quantity;
    }, 0);

    const packageTotal = packages.reduce((sum, item) => {
      const pkg = dbPackages.find((p) => p.id === item.packageId);

      return sum + (pkg?.finalPrice ?? 0) * item.quantity;
    }, 0);

    const originalPrice = menuTotal + packageTotal;

    /* -------------------- FINAL PRICE -------------------- */

    const finalPrice = originalPrice - (originalPrice * discount) / 100;

    /* -------------------- UPDATE EVENT -------------------- */

    const updatedEvent = await prisma.$transaction(async (tx) => {
      const event = await tx.event.update({
        where: { id },
        data: {
          name,
          description: description ?? null,
          categoryId,

          originalPrice,
          discountType: discount > 0 ? "PERCENTAGE" : null,
          discountValue: discount,
          finalPrice,
        },
      });

      /* -------------------- UPDATE MENU ITEMS -------------------- */

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

      /* -------------------- UPDATE PACKAGES -------------------- */

      await tx.eventPackage.deleteMany({
        where: { eventId: id },
      });

      if (packages.length > 0) {
        await tx.eventPackage.createMany({
          data: packages.map((item) => ({
            eventId: id,
            packageId: item.packageId,
            quantity: item.quantity,
          })),
        });
      }

      return event;
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      },
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
