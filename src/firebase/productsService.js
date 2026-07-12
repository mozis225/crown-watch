import { db } from "./config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productsRef = collection(db, "products");

export async function getAllProducts() {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

export async function addProduct(product) {
  const docRef = await addDoc(productsRef, product);
  return docRef.id;
}

export async function updateProduct(id, updatedData) {
  const productDoc = doc(db, "products", id);
  await updateDoc(productDoc, updatedData);
}

export async function deleteProduct(id) {
  const productDoc = doc(db, "products", id);
  await deleteDoc(productDoc);
}