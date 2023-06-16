// firebase-messaging-sw.js
/**
 * @name firebase-messaging-sw.js
 */

import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDNjGs_B7jtd-cMVORaQ0Jr7de1XTr5TdE",
  authDomain: "da-whisky.firebaseapp.com",
  projectId: "da-whisky",
  storageBucket: "da-whisky.appspot.com",
  messagingSenderId: "700714522444",
  appId: "1:700714522444:web:c4b65426f8225e8e5561e9",
  measurementId: "G-G9TQB9FJYT",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  this.registration.showNotification(notificationTitle, notificationOptions);
});
