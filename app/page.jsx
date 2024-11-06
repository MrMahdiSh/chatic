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

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isAlreadyInstalled, setIsAlreadyInstalled] = useState(false); // State to track installation status

  // Handle the install prompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Check if the app is already installed in the useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isInstalled = window.matchMedia("(display-mode: standalone)").matches;
      setIsAlreadyInstalled(isInstalled);
    }
  }, []);

  // Request to install the app when the user clicks on the button
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null); // Clear the deferred prompt
        setIsInstallable(false);
      });
    }
  };

  // Firebase messaging for foreground notifications
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="text-center flex flex-col gap-10 p-10 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] max-w-[85%]">
        <h1>سلام دنیا!</h1>
        <h1 className="text-gray-500">
          این یک تست است برای نصب PWA و ارسال Notification
        </h1>
        {/* Only show the install button if app is installable */}
        {!isAlreadyInstalled && isInstallable && (
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Install App
          </button>
        )}
      </div>
    </div>
  );
}