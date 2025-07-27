
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

// This is the single source of truth for the Firebase configuration.
// It is constructed at runtime on the client-side, ensuring that the
// environment variables provided by Vercel are used.
const getFirebaseConfig = () => {
  // These variables are replaced by Vercel at build time with the values
  // you set in your project's environment variables settings.
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };
};


// This function initializes and returns the Firebase app instance.
// It ensures that the app is only initialized once.
export const getFirebaseApp = (): FirebaseApp | null => {
  // This code will only run in the browser, not on the server.
  if (typeof window === "undefined") {
    return null;
  }

  const config = getFirebaseConfig();

  // If any of the required config values are missing, log an error and stop.
  // This helps diagnose issues with environment variables.
  if (!config.apiKey || !config.projectId) {
      console.error("Firebase config is missing. Make sure all NEXT_PUBLIC_FIREBASE_* environment variables are set in Vercel.");
      return null;
  }

  // Initialize the app if it doesn't already exist.
  if (!getApps().length) {
    return initializeApp(config);
  } else {
    return getApp();
  }
}
