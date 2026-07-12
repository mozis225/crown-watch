import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const messagesRef = collection(db, "messages");

export async function sendMessage(data) {
  await addDoc(messagesRef, {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
}