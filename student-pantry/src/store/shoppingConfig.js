import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  getDoc
} from "firebase/firestore";
import { db, isValidProduct } from "./config.js";

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
  if(!isValidProduct(product)) return false;
  if(typeof(userID) != 'string') return false;
  const userRef = doc(db, `users/${userID}`);
  if(!(await getDoc(userRef)).exists()) return false;


  const listRef = collection(db, `users/${userID}/shoppingList`);
  const food = doc(listRef, product);
  await setDoc(food, {});
  return true;
}

export async function removeFoodShoppingList(userID, product) {
  if(!isValidProduct(product)) return false;
  if(typeof(userID) != 'string') return false;

  const userRef = doc(db, `users/${userID}`);
  if(!(await getDoc(userRef)).exists()) return false;

  const foodRef = doc(collection(db, `users/${userID}/shoppingList`), product);

  if(!(await getDoc(foodRef)).exists()) return false;

  await deleteDoc(foodRef);
  return true;
}

export async function getGroupShoppingList(groupID){
  const listRef = collection(db, `groups/${groupID}/shoppingList`);
  var q = query(listRef);
  var querySnapshot = await getDocs(q);

  const shoppingList = [];
  querySnapshot.forEach((doc) => {
    shoppingList.push(doc.id);
  });
  return shoppingList;
}

export async function addFoodGroupShoppingList(groupID, product) {
  if(!isValidProduct(product)) return false;
  if(typeof(groupID) != 'string') return false;
  const groupRef = doc(db, `groups/${groupID}`);
  if(!(await getDoc(groupRef)).exists()) return false;

  const listRef = collection(db, `groups/${groupID}/shoppingList`);
  const food = doc(listRef, product);
  await setDoc(food, {});
  return true;
}

export async function removeFoodGroupShoppingList(groupID, product) {
  if(!isValidProduct(product)) return false;
  if(typeof(groupID) != 'string') return false;
  const groupRef = doc(db, `groups/${groupID}`);
  if(!(await getDoc(groupRef)).exists()) return false;

  const foodRef = doc(collection(db, `groups/${groupID}/shoppingList`), product);

  if(!(await getDoc(foodRef)).exists()) return false;

  await deleteDoc(foodRef);
  return true;
}