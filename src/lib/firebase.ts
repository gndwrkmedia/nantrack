
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

let firebaseApp: FirebaseApp | null = null;

// This function now correctly initializes Firebase on the client-side,
// ensuring it has access to the environment variables.
export const getFirebaseApp = (): FirebaseApp | null => {
    // Prevent execution on the server.
    if (typeof window === "undefined") {
        return null;
    }

    // Build the config object inside the function to ensure env vars are available.
    const currentFirebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };

    // Ensure the API key is present before trying to initialize.
    if (!currentFirebaseConfig.apiKey) {
        console.error("Firebase API key is missing. Make sure to set NEXT_PUBLIC_FIREBASE_API_KEY in your environment variables.");
        return null;
    }

    // Initialize the app if it hasn't been already.
    if (!getApps().length) {
        try {
            firebaseApp = initializeApp(currentFirebaseConfig);
        } catch (e) {
            console.error("Firebase initialization error", e);
            return null;
        }
    } else {
        firebaseApp = getApp();
    }
    
    return firebaseApp;
}
