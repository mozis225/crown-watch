import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDcOe8Q-J2LYJB7GVDs4T657HYEe55AUw",
  authDomain: "crown-watch.firebaseapp.com",
  projectId: "crown-watch",
  storageBucket: "crown-watch.firebasestorage.app",
  messagingSenderId: "637344987878",
  appId: "1:637344987878:web:8df510d8fd494e2e331927",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);