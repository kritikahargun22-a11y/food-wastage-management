import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Firebase auth user
  const [profile, setProfile] = useState(null); // Firestore user doc (name, role, etc.)
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes (persists across refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data());
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /**
   * Sign up a new user with email/password, store their name + role
   * in Firestore under /users/{uid}.
   */
  async function signup({ name, email, password, phone, role }) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(cred.user, { displayName: name });

    const userData = {
      uid: cred.user.uid,
      name,
      email,
      phone: phone || "",
      role, // "donor" | "ngo" | "volunteer"
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", cred.user.uid), userData);
    setProfile(userData);
    return cred.user;
  }

  /**
   * Log in an existing user and fetch their profile (including role)
   * from Firestore so App.jsx can route them correctly.
   */
  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    console.log("Actual Auth UID:", cred.user.uid);
    console.log("UID lenght:", cred.user.uid.length);
    const userDoc = await getDoc(doc(db, "users", cred.user.uid));
    const userProfile = userDoc.exists() ? userDoc.data() : null;
    setProfile(userProfile);
    return { user: cred.user, profile: userProfile };
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}