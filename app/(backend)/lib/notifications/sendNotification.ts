import { admin } from "@/app/(backend)/lib/firebase/firebase-admin";
type AdminNotificationData = {
  token: string;
  title: string;
  body: string;
  type:string;
  orderId: string;
};

export async function sendNotification({
  token,
  title,
  body,
  type,
  orderId,
}: AdminNotificationData) {
  try {

    console.log("Sending FCM to token:", token);
    const response = await admin.messaging().send({
      token,

      notification: {
        title,
        body,
      },

      data: {
        type,
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