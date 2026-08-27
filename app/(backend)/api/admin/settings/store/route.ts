import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireRole(req, [
      "ADMIN",
      "SUPER_ADMIN",
    ]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const store = await prisma.storeSettings.findFirst();

    if (!store) {
      return NextResponse.json(
        {
          message: "Store settings not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        store,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Get store settings error:", error);

    return NextResponse.json(
      {
        message: "Failed to get store settings",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireRole(req, [
      "ADMIN",
      "SUPER_ADMIN",
    ]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const body = await req.json();

    const {
      name,
      description,
      email,
      phone,
      address,
      city,
      website,

      // Configuration
      currency,
      timezone,
      storeStatus,
      maintenanceMessage,

      // Store state
      isActive,
    } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        {
          message: "Store name is required",
        },
        {
          status: 400,
        }
      );
    }

    const existingStore =
      await prisma.storeSettings.findFirst();

    // =========================
    // CREATE
    // =========================

    if (!existingStore) {
      const store = await prisma.storeSettings.create({
        data: {
          name: name.trim(),

          description:
            description?.trim() || null,

          email:
            email?.trim() || null,

          phone:
            phone?.trim() || null,

          address:
            address?.trim() || null,

          city:
            city?.trim() || null,

          website:
            website?.trim() || null,

          currency:
            currency || "PKR",

          timezone:
            timezone || "Asia/Karachi",

          storeStatus:
            storeStatus || "OPEN",

          maintenanceMessage:
            maintenanceMessage?.trim() || null,

          isActive:
            isActive ?? true,
        },
      });

      return NextResponse.json(
        {
          message:
            "Store settings created successfully",
          store,
        },
        {
          status: 201,
        }
      );
    }

    // =========================
    // UPDATE
    // =========================

    const store = await prisma.storeSettings.update({
      where: {
        id: existingStore.id,
      },

      data: {
        name: name.trim(),

        description:
          description?.trim() || null,

        email:
          email?.trim() || null,

        phone:
          phone?.trim() || null,

        address:
          address?.trim() || null,

        city:
          city?.trim() || null,

        website:
          website?.trim() || null,

        currency:
          currency ?? existingStore.currency,

        timezone:
          timezone ?? existingStore.timezone,

        storeStatus:
          storeStatus ?? existingStore.storeStatus,

        maintenanceMessage:
          maintenanceMessage?.trim() || null,

        isActive:
          isActive ?? existingStore.isActive,
      },
    });

    return NextResponse.json(
      {
        message:
          "Store settings updated successfully",
        store,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Update store settings error:",
      error
    );

    return NextResponse.json(
      {
        message: "Failed to update store settings",
      },
      {
        status: 500,
      }
    );
  }
}