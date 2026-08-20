"use client";

import { useEffect } from "react";
import {getMessaging,getToken,onMessage} from "firebase/messaging";

import { app } from "@/app/(frontend)/lib/firebase/firebase";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

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
          return;
        }

        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          console.log(
            "Notification permission denied",
          );
          return;
        }

        const messaging = getMessaging(app);

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (!token) {
          console.log(
            "FCM token was not generated",
          );
          return;
        }

        console.log("FCM token:", token);

        // Save FCM token
        await apiRequest({
          url: "/api/admin/notification",
          method: "POST",
          body: {token},
          authRequired:true
        });

        // Listen for foreground messages
        unsubscribe = onMessage(
          messaging,
          (payload) => {
            console.log(
              "FCM foreground message:",
              payload,
            );
          },
        );
      } catch (error) {
        console.error(
          "FCM initialization failed:",
          error,
        );
      }
    };

    initializeFCM();

    return () => {
      unsubscribe?.();
    };
  }, []);
}