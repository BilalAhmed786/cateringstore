import { admin } from "@/app/(backend)/lib/firebase/firebase-admin";
type AdminNotificationData = {
  token: string;
  title: string;
  body: string;
  orderId: string;
};

export async function sendAdminNotification({
  token,
  title,
  body,
  orderId,
}: AdminNotificationData) {
  try {
    const response = await admin.messaging().send({
      token,

      notification: {
        title,
        body,
      },

      data: {
        type: "NEW_ORDER",
        orderId,
      },

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