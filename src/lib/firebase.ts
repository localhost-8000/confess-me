import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

let auth: Auth;
let database: ReturnType<typeof getDatabase>;
let firebaseApp: FirebaseApp;
let analytics: ReturnType<typeof getAnalytics>;

const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

export const setupFirebase = () => {
  try {
      firebaseApp = initializeApp({
         apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
         authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
         databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
         projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
         storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
         messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
         appId: import.meta.env.VITE_FIREBASE_APPID,
      });
      analytics = getAnalytics(firebaseApp);
  } catch (error) {
    console.error({error})
  }
};

export const useAuth = () => {
  auth = getAuth(firebaseApp);
  if (useEmulator()) {
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
  return auth;
};

export const useDatabase = () => {       
   if (!database) {
     database = getDatabase(firebaseApp);
   }
   return database;
}

export const useAnalytics = () => {
   if(!analytics) analytics = getAnalytics(firebaseApp);
   return analytics;
}
