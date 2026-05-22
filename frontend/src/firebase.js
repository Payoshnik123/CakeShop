import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF8T2SGxbxcUcjhfPlNHcLLeRKfV7ZWr4",
  authDomain: "cakeking-b3269.firebaseapp.com",
  projectId: "cakeking-b3269",
  storageBucket: "cakeking-b3269.firebasestorage.app",
  messagingSenderId: "866106324917",
  appId: "1:866106324917:web:538b5152ba04354bf0cbfc",
  measurementId: "G-N8K9N9TV5H"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Analytics
const analytics = getAnalytics(app);

// ✅ Authentication
export const auth = getAuth(app);

export default app;