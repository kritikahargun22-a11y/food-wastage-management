import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";

/**
 * Creates a notification document for a specific user.
 * type: "donation" | "pickup" | "delivery" | "expiry" | "approval"
 */
export async function sendNotification({ userId, title, desc, type = "donation" }) {
  if (!userId) return;
  try {
    await addDoc(collection(db, "notifications"), {
      userId,
      title,
      desc,
      type,
      read: false,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
}