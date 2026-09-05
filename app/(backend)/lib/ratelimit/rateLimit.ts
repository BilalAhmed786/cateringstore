import { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const requests = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS =100; // 100 requests per minute

export function rateLimit(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();

  const existing = requests.get(ip);

  // First request or previous window expired
  if (!existing || now > existing.resetAt) {
    requests.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
      retryAfter: 0,
    };
  }

  // Limit exceeded
  if (existing.count >= MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count++;

  return {
    success: true,
    remaining: MAX_REQUESTS - existing.count,
    retryAfter: 0,
  };
}