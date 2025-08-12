import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // optionnel
};

// évite l’erreur “Firebase App named ‘[DEFAULT]’ already exists”
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Exports standards
export const auth = getAuth(app);
export const db = getFirestore(app); // 👉 même base Firestore que l’ancienne PWA
export const storage = getStorage(app);
export default app;
