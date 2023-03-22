import {db, addFood, removeProduct} from '../store/config.js'
import { doc, collection, getDoc, deleteDoc, getDocs, query} from 'firebase/firestore';
import { addFoodShoppingList } from '../store/shoppingConfig.js';
import { removeFoodShoppingList } from '../store/shoppingConfig.js';


export async function removeWasteItem(userID, product){
    const foodRef = doc(collection(db, `users/${userID}/wasteHistory`), product);
    await deleteDoc(foodRef);
}


export async function clearFood(userID){
    const collectionRef = collection(db, `users/${userID}/food`);
    var q = query(collectionRef);
    var querySnapshot = await getDocs(q);
    var docs = []
    querySnapshot.forEach((doc) => {
      docs.push(doc.id)
    });
    for(const doc of docs){
      await removeProduct(userID, doc);
    }
}

export async function clearWasteHistory(userID){
  const collectionRef = collection(db, `users/${userID}/wasteHistory`);
  var q = query(collectionRef);
  var querySnapshot = await getDocs(q);
  var docs = []
  querySnapshot.forEach((doc) => {
    docs.push(doc.id)
  });
  for(const doc of docs){
    await removeWasteItem(userID, doc);
  }
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

export async function makeTestShoppingList(userID){
  await addFoodShoppingList(userID, "Garlic");
  await addFoodShoppingList(userID, "Ginger");
}

export async function clearShoppingList(userID){
  const collectionRef = collection(db, `users/${userID}/shoppingList`);
  var querySnapshot = await getDocs(query(collectionRef));
  var docs = []
  querySnapshot.forEach((doc) => {
    docs.push(doc.id)
  });
  for(const doc of docs){
    await removeFoodShoppingList(userID, doc)
  }
}
// await makeTest