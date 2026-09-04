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

        

        if (permission !== "granted") {
          console.log("[FCM] Notification permission denied");
          return;
        }

        const messaging = getMessaging(app);



        // Foreground listener
        unsubscribe = onMessage(messaging, (payload) => {
       
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

          
        });

        // Get FCM token
        const token = await getToken(messaging, {
          vapidKey:
            process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

       // Save token to backend
         await apiRequest({
          url: "/api/admin/notification",
          method: "POST",
          body: { token },
          authRequired: true,
        });

      } catch (error) {
        console.error("[FCM] Initialization failed:", error);
      }
    };

    initializeFCM();

    return () => {
      
      unsubscribe?.();
    };
  }, []);
}