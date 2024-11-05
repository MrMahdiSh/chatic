"use client";

import { Button } from "@/components/ui/button";
import Header from "components/ui/header"; // Assuming you have a header component
import { useState, useEffect } from "react";
import { requestNotificationPermission } from "../lib/firebase";

const buttonClick = () => {
  console.log("clicked");
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      ),
    });
    setSubscription(sub);
    await subscribeUser(sub); // Make sure this function is defined in your context
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser(); // Make sure this function is defined in your context
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message); // Make sure this function is defined in your context
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p className="text-red-500">Push notifications are not supported in this browser.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-2xl font-semibold mb-4">Push Notifications</h3>
      {subscription ? (
        <>
          <p className="text-green-600">You are subscribed to push notifications.</p>
          <button className="mt-2 text-red-600 hover:text-red-800" onClick={unsubscribeFromPush}>
            Unsubscribe
          </button>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 mt-4 w-full"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-blue-600"
            onClick={sendTestNotification}
          >
            Send Test
          </button>
        </>
      ) : (
        <>
          <p className="text-yellow-600">You are not subscribed to push notifications.</p>
          <button
            className="bg-green-500 text-white rounded-md px-4 py-2 mt-2 hover:bg-green-600"
            onClick={subscribeToPush}
          >
            Subscribe
          </button>
        </>
      )}
    </div>
  );
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window, any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-2xl font-semibold mb-4">Install App</h3>
      <button className="bg-yellow-500 text-white rounded-md px-4 py-2 hover:bg-yellow-600">
        Add to Home Screen
      </button>
      {isIOS && (
        <p className="mt-2">
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then Add to Home Screen
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}

const handleClick = () => {
  requestNotificationPermission();
};

export default function Page() {
  return (
    <div className="p-20 bg-gray-100 min-h-screen">
      <Header />
      <PushNotificationManager />
      <InstallPrompt />
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600"
        onClick={handleClick}
      >
        Enable Notifications
      </button>
    </div>
  );
}