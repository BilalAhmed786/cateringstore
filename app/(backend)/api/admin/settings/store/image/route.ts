import { NextRequest, NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "@/app/(backend)/lib/cloudinary/cloudinary";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";


export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole(req, [
      "ADMIN",
      "SUPER_ADMIN",
    ]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const formData = await req.formData();

    const file = formData.get("image");
    const storeId = formData.get("storeId") as string;

    // =========================
    // VALIDATION
    // =========================

    if (!storeId) {
      return NextResponse.json(
        {
          message: "storeId missing",
        },
        {
          status: 400,
        }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          message: "Logo image is required",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // CHECK STORE
    // =========================

    const store =
      await prisma.storeSettings.findUnique({
        where: {
          id: storeId,
        },
      });

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

    // =========================
    // FILE → BUFFER
    // =========================

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    // =========================
    // CLOUDINARY UPLOAD
    // =========================

    const uploadResult =
      await new Promise<UploadApiResponse>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "cateringstore/store",
                resource_type: "image",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(
                    result as UploadApiResponse
                  );
                }
              }
            )
            .end(buffer);
        }
      );

    // =========================
    // UPDATE STORE
    // =========================

    const updated =
      await prisma.storeSettings.update({
        where: {
          id: storeId,
        },

        data: {
          logo: uploadResult.secure_url,
          logoPublicId: uploadResult.public_id,
        },
      });

    // =========================
    // RESPONSE
    // =========================

    return NextResponse.json(
      {
        success: true,
        message: "Store logo uploaded successfully",

        storeId: updated.id,

        logo: updated.logo,

        logoPublicId: updated.logoPublicId,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "STORE LOGO UPLOAD ERROR:",
      error
    );

    return NextResponse.json(
      {
        message: "Store logo upload failed",
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}