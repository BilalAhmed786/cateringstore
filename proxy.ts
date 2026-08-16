import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/app/(backend)/lib/jwt/jwt";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("access_token")?.value;

  try {
    const decoded = token ? verifyJwt(token) : null;

    if (pathname.startsWith("/auth")) {
      if (decoded) {
        // User already logged in → redirect based on role
        if (decoded.role === "ADMIN" || decoded.role === "SUPER_ADMIN") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        } else if (decoded.role === "CLIENT") {
          return NextResponse.redirect(new URL("/client/dashboard", req.url));
        }
      }
      return NextResponse.next(); // allow login/register for unauthenticated users
    }

    
    if (pathname.startsWith("/admin")) {
      if (!decoded) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      if (decoded.role === "ADMIN" || decoded.role === "SUPER_ADMIN") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/client/dashboard", req.url));
      }
    }

    if (pathname.startsWith("/client")) {
      if (!decoded) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
      }
      if (decoded.role === "CLIENT") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }

  
    return NextResponse.next();
  } catch (err) {
    console.log(err);
    // Invalid token → redirect to login
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// Apply middleware to admin, client, and auth routes
export const config = {
  matcher: ["/admin/:path*", "/client/:path*", "/auth/:path*"],
};
