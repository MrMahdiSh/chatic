// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj2se-SIZORd5UOZE8HRbwjCo1CTg-zeM",
  authDomain: "chatic-1cdcd.firebaseapp.com",
  projectId: "chatic-1cdcd",
  storageBucket: "chatic-1cdcd.appspot.com",
  messagingSenderId: "784705449758",
  appId: "1:784705449758:web:2a0096931b0aaee2d3230f",
  measurementId: "G-4E81YEB224"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// Request permission and get token for messaging
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });
      console.log("FCM Token:", token);
      // Save the token to your server if needed
    } else {
      console.error("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting notification permission or token:", error);
  }
};

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Customize notification handling here
});

// Export the messaging instance for use in other parts of your application
export { messaging };