import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { calculateDashboardStats } from "./utils/statsCalculator";
import { StatsPeriod } from "./utils/dateRange";

const validPeriods: StatsPeriod[] = [
  "1m",
  "3m",
  "6m",
  "1y",
];

export async function GET(req: NextRequest) {
  const auth = await requireRole(req, ["ADMIN","SUPER_ADMIN"]);

  if (auth instanceof NextResponse) {
    return auth;
  }

  try {
    const period =
      req.nextUrl.searchParams.get("period") ?? "1m";

    if (!validPeriods.includes(period as StatsPeriod)) {
      return NextResponse.json(
        { message: "Invalid period" },
        { status: 400 }
      );
    }

    const stats = await calculateDashboardStats(
      period as StatsPeriod
    );

    return NextResponse.json(stats);
  } catch (error) {
    console.error(
      "Failed to fetch dashboard stats:",
      error
    );

    return NextResponse.json(
      { message: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}