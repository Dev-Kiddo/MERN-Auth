import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "mern-auth-bd284.firebaseapp.com",
  projectId: "mern-auth-bd284",
  storageBucket: "mern-auth-bd284.firebasestorage.app",
  messagingSenderId: "335011399723",
  appId: "1:335011399723:web:399ba1fe3af1695d87026e",
  measurementId: "G-1NJF2HDCJW",
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
