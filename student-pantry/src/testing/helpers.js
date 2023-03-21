import {db, addFood, removeProduct} from '../store/config.js'
import { doc, collection, getDoc, deleteDoc, getDocs, query} from 'firebase/firestore';

export async function removeWasteItem(userID, product){
    const foodRef = doc(collection(db, `users/${userID}/wasteHistory`), product);
    await deleteDoc(foodRef);
}

export async function clearFood(userID){
    const collectionRef = collection(db, `users/${userID}/food`);
    var q = query(collectionRef);
    var querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      removeProduct(userID, doc.id);
    });
}

export async function clearWasteHistory(userID){
  const collectionRef = collection(db, `users/${userID}/wasteHistory`);
  var q = query(collectionRef);
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    removeWasteItem(userID, doc.id);
  });
}

export async function makeTestPantry(userID){
  await addFood(userID, "Cheese", true, new Date("2023 04 15"), true, new Date("2023 03 07"))
  await addFood(userID, "Ham", false, new Date("2023 03 23"), false, new Date("2023 03 07"))
  await addFood(userID, "Onion", true, new Date("2023 09 15"), false, new Date("2023 03 07"))
  await addFood(userID, "Soup", false, new Date("2025 05 04"), true, new Date("2023 03 07"))
}

export async function makeTestPantryG2(){
  await addFood("testG2", "Pizza", false, new Date("2023 04 15"), true, new Date("2023 03 07"));
  await addFood("testG2", "Kimchi", true, new Date("2023 03 23"), true, new Date("2023 03 07"))
  await addFood("testG2", "Pepper", true, new Date("2023 09 15"), false, new Date("2023 03 07"))
  await addFood("testG2", "Pork", false, new Date("2025 05 04"), true, new Date("2023 03 07"))
}
