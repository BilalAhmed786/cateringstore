importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

console.log("[FCM SW] Service worker loaded");

firebase.initializeApp({
  // your Firebase config
});

console.log("[FCM SW] Firebase initialized");

const messaging = firebase.messaging();

console.log("[FCM SW] Messaging initialized");

messaging.onBackgroundMessage((payload) => {
  console.log("[FCM SW] Background message received:", payload);

  console.log("[FCM SW] Notification:", payload.notification);
  console.log("[FCM SW] Data:", payload.data);

  const title = payload.notification?.title || "New Notification";

  const options = {
    body: payload.notification?.body || "",
    icon: "/icon-192.png",
    data: payload.data || {},
  };

  console.log("[FCM SW] Showing notification:", {
    title,
    options,
  });

  self.registration
    .showNotification(title, options)
    .then(() => {
      console.log("[FCM SW] Notification displayed successfully");
    })
    .catch((error) => {
      console.error("[FCM SW] Failed to display notification:", error);
    });
});