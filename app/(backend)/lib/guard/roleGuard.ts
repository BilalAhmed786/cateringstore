// lib/roleGuard.ts
import { getCurrentUser } from "./getCurrentuser";
import { NextRequest, NextResponse } from "next/server";

 export async function requireRole(req:NextRequest , roles: string[]) {
 
  const user = await getCurrentUser(req);

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!roles.includes(user.role)) {
    
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  return user; 
}
