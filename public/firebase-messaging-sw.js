importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBfyBrefVK9fDFMjtMtUs20oQttGaFdBgw",
  authDomain: "catering-store.firebaseapp.com",
  projectId: "catering-store",
  messagingSenderId: "423137048883",
  appId: "1:423137048883:web:1683ae913f9a14bb3be646",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Background message:",
    payload
  );

  const title = payload.notification?.title || "New Notification";

  const options = {
    body: payload.notification?.body || "",
    icon: "/icon-192.png",
    data: payload.data || {},
  };

  self.registration.showNotification(title, options);
});