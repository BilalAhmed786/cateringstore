import { admin } from "@/app/(backend)/lib/firebase/firebase-admin";

type AdminNotificationData = {
  token: string;
  title: string;
  body: string;
  type: string;
  orderId?: string; 
  inquiryId?: string;
};

export async function sendNotification({
  token,
  title,
  body,
  type,
  orderId,
  inquiryId,
}: AdminNotificationData) {
  try {
    console.log("Sending FCM to token:", token);

    const data: Record<string, string> = {
      type,
    };

    if (orderId) { 
      data.orderId = orderId;
    }

    if (inquiryId) {
      data.inquiryId = inquiryId;
    }

    const response = await admin.messaging().send({
      token,

      notification: {
        title,
        body,
      },

      data,

      webpush: {
        notification: {
          title,
          body,
        },
      },
    });

    console.log("Admin notification sent:", response);

    return response;
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    throw error;
  }
}