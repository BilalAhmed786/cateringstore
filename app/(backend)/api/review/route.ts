import { NextRequest, NextResponse } from "next/server";


import { getReviewParams } from "./utils/params";

import { getPackageReviews } from "./utils/packageReviews";
import { getEventReviews } from "./utils/eventReviews";
import { getHamperReviews } from "./utils/hamperReviews";

import {
  normalizeMenuItemReview,
  normalizePackageReview,
  normalizeEventReview,
  normalizeHamperReview,
} from "./utils/normalizeReview";
import { requireRole } from "../../lib/guard/roleGuard";
import { getMenuItemReviews } from "./utils/MenuItemReviews";

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