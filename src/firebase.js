import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWukg525joLvniUvgoU6ng1t8ShXH96bc",
  authDomain: "foodshare-app-a7e6d.firebaseapp.com",
  projectId: "foodshare-app-a7e6d",
  storageBucket: "foodshare-app-a7e6d.firebasestorage.app",
  messagingSenderId: "1062582950721",
  appId: "1:1062582950721:web:efbf5162f2bdf730049fc0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;