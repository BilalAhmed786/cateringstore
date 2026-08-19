// lib/auth/getCookieUser.ts

import { NextRequest } from "next/server";
import { verifyJwt } from "../jwt/jwt";


export async function getJwtUser(req: NextRequest) {
  try {
    const token = req.cookies.get("access_token")?.value;

    if (!token) {
      return null;
    }

    const decoded = await verifyJwt(token);

    if (!decoded?.sub || !decoded?.role) {
      return null;
    }

    return {
      id: decoded.sub as string,
      role: decoded.role as
        | "CLIENT"
        | "ADMIN"
        | "SUPER_ADMIN",
    };
  } catch {
    return null;
  }
}