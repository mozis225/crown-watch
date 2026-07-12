import { db } from "./config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

const ordersRef = collection(db, "orders");

export async function createOrder(orderData) {
  const docRef = await addDoc(ordersRef, {
    ...orderData,
    status: "En attente",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserOrders(userId) {
  const q = query(
    ordersRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

// Pour l'Admin : récupère TOUTES les commandes de tous les clients
export async function getAllOrders() {
  const q = query(ordersRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function updateOrderStatus(orderId, status) {
  const orderDoc = doc(db, "orders", orderId);
  await updateDoc(orderDoc, { status });
}