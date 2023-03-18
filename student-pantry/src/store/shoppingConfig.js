import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
import { db } from "./config.js";

export async function getShoppingList(userID) {
  const listRef = collection(db, `users/${userID}/shoppingList`);
  var q = query(listRef);
  var querySnapshot = await getDocs(q);
  const shoppingList = [];
  querySnapshot.forEach((doc) => {
    shoppingList.push(doc.id);
  });
  return shoppingList;
}

export async function addFoodShoppingList(userID, product) {
  const listRef = collection(db, `users/${userID}/shoppingList`);
  const food = doc(listRef, product);
  await setDoc(food, {});
}

export async function removeFoodShoppingList(userID, product) {
  const foodRef = doc(collection(db, `users/${userID}/shoppingList`), product);
  await deleteDoc(foodRef);
}
