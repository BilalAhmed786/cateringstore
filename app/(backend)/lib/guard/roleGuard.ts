// lib/roleGuard.ts
import { getCurrentUser } from "./getCurrentuser";
import { NextResponse } from "next/server";

export async function requireRole(req: Request, roles: string[]) {
  const user = await getCurrentUser(req);

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!roles.includes(user.role)) {
    console.log(user.role)
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return user; 
}
