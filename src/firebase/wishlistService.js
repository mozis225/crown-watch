import { db } from "./config";
import {
  doc,
  getDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

export async function getUserFavorites(userId) {
  const favDoc = doc(db, "favorites", userId);
  const snapshot = await getDoc(favDoc);
  return snapshot.exists() ? snapshot.data().productIds || [] : [];
}

export async function addFavorite(userId, productId) {
  const favDoc = doc(db, "favorites", userId);
  await setDoc(
    favDoc,
    { productIds: arrayUnion(productId) },
    { merge: true }
  );
}

export async function removeFavorite(userId, productId) {
  const favDoc = doc(db, "favorites", userId);
  await setDoc(
    favDoc,
    { productIds: arrayRemove(productId) },
    { merge: true }
  );
}