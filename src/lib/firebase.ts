import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

let auth: Auth;
let database: ReturnType<typeof getDatabase>;
let firebaseApp: FirebaseApp;
let firestore: ReturnType<typeof getFirestore>;
let storage: ReturnType<typeof getStorage>;

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

export const useFirestore = () => {
  if (!firestore) {
    firestore = getFirestore();
    if (useEmulator()) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  }
  return firestore;
};

export const useDatabase = () => {       
   if (!database) {
     database = getDatabase(firebaseApp);
   }
   return database;
}

export const useStorage = () => {
  if (!storage) {
    storage = getStorage();
    if (useEmulator()) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
  }
  return storage;
};
