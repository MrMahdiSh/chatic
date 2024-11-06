// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDj2se-SIZORd5UOZE8HRbwjCo1CTg-zeM",
  authDomain: "chatic-1cdcd.firebaseapp.com",
  projectId: "chatic-1cdcd",
  storageBucket: "chatic-1cdcd.firebasestorage.app",
  messagingSenderId: "784705449758",
  appId: "1:784705449758:web:2a0096931b0aaee2d3230f",
  measurementId: "G-4E81YEB224",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
