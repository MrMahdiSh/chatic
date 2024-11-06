"use client";

import { useState, useEffect } from "react";
import React from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "utils/firebase/firebase";
import useFcmToken from "utils/firebase/hooks/useFcmToken";

export default function Page() {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();
  // Use the token as needed
  fcmToken && console.log("FCM token:", fcmToken);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="text-center flex flex-col gap-10 p-10 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] max-w-[85%]">
        {" "}
        <h1>سلام دنیا!</h1>
        <h1 className="text-gray-500">
          این یک تست است برای نصب PWA و ارسال Notification
        </h1>
      </div>
    </div>
  );
}
