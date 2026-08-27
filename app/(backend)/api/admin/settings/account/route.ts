import { admin } from "@/app/(backend)/lib/firebase/firebase-admin";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){
  try {
    const auth = await requireRole(req, [
      "ADMIN",
      "SUPER_ADMIN",
    ]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { name, photoURL } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    const id = auth.id;
   
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // Update Firebase Auth
    await admin.auth().updateUser( id, {
      displayName: name.trim(),
      photoURL: photoURL?.trim() || undefined,
    });

    // Update Prisma User
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: name.trim(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Update admin profile error:", error);

    return NextResponse.json(
      {
        message: "Failed to update profile",
      },
      {
        status: 500,
      }
    );
  }
};
