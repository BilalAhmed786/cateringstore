import { NextRequest, NextResponse } from "next/server";

import { requireRole } from "../../../../lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { normalizeMenuItemReview, normalizePackageReview, normalizeEventReview, normalizeHamperReview } from "../../../review/utils/normalizeReview";


interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    // ADMIN + SUPER_ADMIN
    const user = await requireRole(req, [
      "ADMIN",
      "SUPER_ADMIN",
    ]);

    if (user instanceof NextResponse) {
      return user;
    }

    const { id } = await params;

    /*
     * Search all review tables.
     *
     * We use findUnique because every review has
     * its own unique UUID.
     */

    const menuItemReview =
      await prisma.menuItemReview.findUnique({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          menuItem: {
            select: {
              id: true,
              title: true,
              images: {
                take: 1,
                select: {
                  url: true,
                },
              },
            },
          },
        },
      });

    if (menuItemReview) {
      return NextResponse.json(
        normalizeMenuItemReview(menuItemReview)
      );
    }

    const packageReview =
      await prisma.packageReview.findUnique({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          package: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

    if (packageReview) {
      return NextResponse.json(
        normalizePackageReview(packageReview)
      );
    }

    const eventReview =
      await prisma.eventReview.findUnique({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          event: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

    if (eventReview) {
      return NextResponse.json(
        normalizeEventReview(eventReview)
      );
    }

    const hamperReview =
      await prisma.hamperReview.findUnique({
        where: {
          id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          hamper: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      });

    if (hamperReview) {
      return NextResponse.json(
        normalizeHamperReview(hamperReview)
      );
    }

    return NextResponse.json(
      {
        message: "Review not found",
      },
      {
        status: 404,
      }
    );
  } catch (error) {
    console.error(
      "GET ADMIN REVIEW BY ID ERROR:",
      error
    );

    return NextResponse.json(
      {
        message: "Failed to fetch review",
      },
      {
        status: 500,
      }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
  
    const user = await requireRole(
      req,
      ["SUPER_ADMIN"]
    );

    if (user instanceof NextResponse) {
      return user;
    }

    const { id } = await params;
    const type = req.nextUrl.searchParams.get("type") 

    if (!type) {
      return NextResponse.json(
        {
          message:
            "Review type is required",
        },
        { status: 400 }
      );
    }

    /*
     * Delete the correct review type
     */
    switch (type) {
      case "MENU_ITEM":
        await prisma.menuItemReview.delete({
          where: {
            id,
          },
        });
        break;

      case "PACKAGE":
        await prisma.packageReview.delete({
          where: {
            id,
          },
        });
        break;

      case "EVENT":
        await prisma.eventReview.delete({
          where: {
            id,
          },
        });
        break;

      case "HAMPER":
        await prisma.hamperReview.delete({
          where: {
            id,
          },
        });
        break;

      default:
        return NextResponse.json(
          {
            message:
              "Invalid review type",
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      message:
        "Review deleted successfully",
      id,
      type,
    });
  } catch (error) {
    console.error(
      "DELETE REVIEW ERROR:",
      error
    );

    if (
      error instanceof Error &&
      error.message.includes(
        "Record to delete does not exist"
      )
    ) {
      return NextResponse.json(
        {
          message: "Review not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Failed to delete review",
      },
      { status: 500 }
    );
  }
}