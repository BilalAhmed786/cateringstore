
import { NextRequest, NextResponse } from "next/server";
import { getEventReviews } from "../../review/utils/eventReviews";
import { getHamperReviews } from "../../review/utils/hamperReviews";
import { getMenuItemReviews } from "../../review/utils/MenuItemReviews";
import { normalizeMenuItemReview, normalizePackageReview, normalizeEventReview, normalizeHamperReview } from "../../review/utils/normalizeReview";
import { getPackageReviews } from "../../review/utils/packageReviews";
import { getReviewParams } from "../../review/utils/params";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";


export async function GET(req: NextRequest) {
  try {
    /*
     * ADMIN + SUPERADMIN
     */
  const user = await requireRole(req, ["ADMIN","SUPER_ADMIN"]);

    // requireRole returns NextResponse when authentication/role fails
    if (user instanceof NextResponse) {
      return user;
    }

    /*
     * Query parameters
     */
    const params = getReviewParams(req);

    const [
      menuReviews,
      packageReviews,
      eventReviews,
      hamperReviews,
    ] = await Promise.all([
      getMenuItemReviews(params),
      getPackageReviews(params),
      getEventReviews(params),
      getHamperReviews(params),
    ]);

    /*
     * Normalize the different Prisma
     * structures into AdminReview.
     */
    const reviews = [
      ...menuReviews.map(normalizeMenuItemReview),
      ...packageReviews.map(normalizePackageReview),
      ...eventReviews.map(normalizeEventReview),
      ...hamperReviews.map(normalizeHamperReview),
    ];

    /*
     * Newest reviews first
     */
    reviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    /*
     * Total before pagination
     */
    const total = reviews.length;

    /*
     * Pagination
     */
    const start =
      (params.page - 1) * params.limit;

    const paginatedReviews = reviews.slice(
      start,
      start + params.limit
    );

    return NextResponse.json({
      reviews: paginatedReviews,
      total,
      page: params.page,
      limit: params.limit,
    });
  } catch (error) {
    console.error(
      "GET ADMIN REVIEWS ERROR:",
      error
    );

    return NextResponse.json(
      {
        message: "Failed to fetch reviews",
      },
      { status: 500 }
    );
  }
}