// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj2se-SIZORd5UOZE8HRbwjCo1CTg-zeM",
  authDomain: "chatic-1cdcd.firebaseapp.com",
  projectId: "chatic-1cdcd",
  storageBucket: "chatic-1cdcd.firebasestorage.app",
  messagingSenderId: "784705449758",
  appId: "1:784705449758:web:2a0096931b0aaee2d3230f",
  measurementId: "G-4E81YEB224"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

// Request user permission for notifications
const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            console.log("Notification permission granted.");
            // Get the token for the current device
            const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY });
            console.log("FCM Token:", token);
        } else {
            console.error("Unable to get permission to notify.");
        }
    } catch (error) {
        console.error("Error getting notification permission:", error);
    }
};

// Listen for messages when the app is in the foreground
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // Customize notification here
    new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
    });
});

// Export messaging and the requestNotificationPermission function
export { messaging, requestNotificationPermission };
