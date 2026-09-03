"use client";

import { useEffect } from "react";
import {
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";

import { app } from "@/app/(frontend)/lib/firebase/firebase";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useNotificationStore } from "@/app/(frontend)/store/notificationStore";

export function useFCM() {
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initializeFCM = async () => {
      try {
        console.log("[FCM] Initializing...");

        if (
          typeof window === "undefined" ||
          !("Notification" in window) ||
          !("serviceWorker" in navigator)
        ) {
          console.log("[FCM] Browser does not support notifications");
          return;
        }

        // Request permission
        const permission = await Notification.requestPermission();

        console.log("[FCM] Notification permission:", permission);

        if (permission !== "granted") {
          console.log("[FCM] Notification permission denied");
          return;
        }

        const messaging = getMessaging(app);

        console.log("[FCM] Messaging initialized");

        // Foreground listener
        unsubscribe = onMessage(messaging, (payload) => {
          console.log("[FCM] Foreground message received:", payload);

          console.log("[FCM] Notification:", payload.notification);
          console.log("[FCM] Data:", payload.data);

          useNotificationStore.getState().addNotification({
            id:
              payload.messageId ??
              crypto.randomUUID(),

            title:
              payload.notification?.title ??
              "New Notification",

            body:
              payload.notification?.body ??
              "",

            type: payload.data?.type,

            orderId: payload.data?.orderId,
          });

          console.log("[FCM] Notification added to Zustand");
        });

        console.log("[FCM] Foreground listener registered");

        // Get FCM token
        const token = await getToken(messaging, {
          vapidKey:
            process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (!token) {
          console.log("[FCM] No FCM token received");
          return;
        }

        console.log("[FCM] FCM token received:", token);

        // Save token to backend
        const response = await apiRequest({
          url: "/api/admin/notification",
          method: "POST",
          body: { token },
          authRequired: true,
        });

        console.log("[FCM] Token saved to backend:", response);
      } catch (error) {
        console.error("[FCM] Initialization failed:", error);
      }
    };

    initializeFCM();

    return () => {
      console.log("[FCM] Cleaning up foreground listener");
      unsubscribe?.();
    };
  }, []);
}