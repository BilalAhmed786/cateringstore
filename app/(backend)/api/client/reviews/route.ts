import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { NextRequest, NextResponse } from "next/server";
import { getClientEventReviews } from "./utils/getClientEventReviews";
import { getClientHamperReviews } from "./utils/getClientHamperReviews";
import { getClientMenuReviews } from "./utils/getClientMenuReviews";
import { getClientPackageReviews } from "./utils/getClientPackageReviews";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireRole(req, ["CLIENT"]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const userId = auth.id;

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const type = searchParams.get("type");

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1,
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 10,
        1,
      ),
      100,
    );

    const [
      menuReviews,
      packageReviews,
      eventReviews,
      hamperReviews,
    ] = await Promise.all([
      !type || type === "ALL" || type === "MENU"
        ? getClientMenuReviews(userId, search)
        : Promise.resolve([]),

      !type || type === "ALL" || type === "PACKAGE"
        ? getClientPackageReviews(userId, search)
        : Promise.resolve([]),

      !type || type === "ALL" || type === "EVENT"
        ? getClientEventReviews(userId, search)
        : Promise.resolve([]),

      !type || type === "ALL" || type === "HAMPER"
        ? getClientHamperReviews(userId, search)
        : Promise.resolve([]),
    ]);

    const reviews = [
      ...menuReviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,

        type: "MENU" as const,

        item: {
          id: review.menuItem.id,
          name: review.menuItem.title,
          image: review.menuItem.images[0]?.url ?? null,
        },
      })),

      ...packageReviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,

        type: "PACKAGE" as const,

        item: {
          id: review.package.id,
          name: review.package.name,
          image: review.package.image,
        },
      })),

      ...eventReviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,

        type: "EVENT" as const,

        item: {
          id: review.event.id,
          name: review.event.name,
          image: review.event.image,
        },
      })),

      ...hamperReviews.map((review) => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,

        type: "HAMPER" as const,

        item: {
          id: review.hamper.id,
          name: review.hamper.name,
          image: review.hamper.image,
        },
      })),
    ];

    // Sort all review types together
    reviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );

    // Total BEFORE pagination
    const total = reviews.length;

    // Pagination
    const totalPages = Math.ceil(total / limit);

    const skip = (page - 1) * limit;

    const paginatedReviews = reviews.slice(
      skip,
      skip + limit,
    );

    return NextResponse.json({
      reviews: paginatedReviews,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Client reviews error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch client reviews",
      },
      {
        status: 500,
      },
    );
  }
}