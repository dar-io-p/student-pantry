import { initializeApp } from 'firebase/app';
import { doc, getFirestore, collection, setDoc, getDocs , Timestamp, getDoc, updateDoc, deleteDoc} from "firebase/firestore"; 
import { query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDADBZ0U_i7OPlgIdu1t5wgz8NJT9ifzU0",
  authDomain: "pantryapp2.firebaseapp.com",
  projectId: "pantryapp2",
  storageBucket: "pantryapp2.appspot.com",
  messagingSenderId: "535500183633",
  appId: "1:535500183633:web:82a8874e764ca6d1698070"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/*food items must be of form 
{
id: product,
isLow: low,
shared: shared,
useBy: Timestamp.fromDate(new Date(useby)),
purchaseDate: purchaseDate,
isWasted: false, 
}
*/

export async function addFood(userID, product, low, useby, shared, purchaseDate){
  //adds food item document by the name of product to the food list of a certain username 
  // this specific document will contain fields like quantity, useby and whether its shared or not
  // is low, is finished are determined by the user
  //is expired might not be necessary, ASK DURING TUTORIAL
  const collectionRef = collection(db, `users/${userID}/food`);
  const fooditem = doc(collectionRef, product);
  await setDoc(fooditem, {
    id: product,
    isLow: low,
    shared: shared,
    useBy: Timestamp.fromDate(new Date(useby)),
    purchaseDate: Timestamp.fromDate(new Date(purchaseDate)),
    isWasted: false, 
  });
}

//returns list of unshared unwasted food items
export async function getIndividual(userID){
  //get all individual foods for a certain id <-- gets products that would be in individual pantry
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef ,where("shared", "==", false), where("isWasted", "==", false));
  var querySnapshot = await getDocs(q);
  const indiv = [];
  querySnapshot.forEach((doc) => {
    indiv.push(doc.data());
  });
  return indiv;
}

//returns list of shared unwasted food items
export async function getShared(userID){
  //get all shared foods for a certain id <-- gets products that would be in shared pantry
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef, where("shared", "==", true), where("isWasted", "==", false));
  var querySnapshot = await getDocs(q);
  const shared = [];
  querySnapshot.forEach((doc) => {
    shared.push(doc.data());
  });
  return shared;
}

//returns list of wasted food for user
export async function getWasted(userID) {
  //returns which products are wasted for a certain user
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef, where("isWasted", "==", true));
  const wasted = [];
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    wasted.push(doc.data());
  });
  return wasted;
}

//returns list of all not wasted food for user
export async function getNotWasted(userID) {
  //returns which products are not wasted for a certain user
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef, where("isWasted", "==", false));
  const not_wasted = [];
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    not_wasted.push(doc.data());
  });
  return not_wasted;
}

//returns list of unshared wasted food 
export async function getWastedIndiv(userID){
  //getting all the food items which are wasted and are not being shared with different users
  const collectionRef = collection(db, `users/${userID}/food`);
  // var q = query(collectionRef, where("shared", "==", false), where("isfinished", "==", true)); !!changed to below!!
  var q = query(collectionRef, where("shared", "==", false), where("isWasted", "==", true));
  const wastedindiv = [];
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    wastedindiv.push(doc.data())
  });
  return wastedindiv
}

//returns list of shared wasted food
export async function getWastedShared(userID){
  //getting all the food items which are wasted and are being shared with different users
  const collectionRef = collection(db, `users/${userID}/food`);
  const wastedshared = [];
  // var q = query(collectionRef, where("shared", "==", true), where("isfinished", "==", true)); !!changed to below!!
  var q = query(collectionRef, where("shared", "==", true), where("isWasted", "==", true));
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    wastedshared.push(doc.data());
  });
  return wastedshared
}

//returns list of food items for all users in a pantry
export async function getSharedPantry(pantryId) {
   //gets items in a certain pantry ie pantry 3 by looping through all users and getting the food of those whose pantry = pantryId
   const usersCollectionRef = collection(db, "users");
   const usersQuerySnapshot = await getDocs(
     query(usersCollectionRef, where("pantry", "==", pantryId))
     );
     const items = [];
     await Promise.all(
       usersQuerySnapshot.docs.map(async (userDoc) => {
      updateExpired(userDoc.id)
      const foodCollectionRef = collection(db, `users/${userDoc.id}/food`);
      const foodQuerySnapshot = await getDocs(foodCollectionRef);
      foodQuerySnapshot.docs.forEach((foodDoc) => {
        if (foodDoc.data().shared) {
          items.push(foodDoc.data());
        }
      });
    })
  );
  return items;
}

//updates isWasted to specified boolean with product id as string 
export async function updateWasted(userID, product, boolean){
  //updates expired field to true or false depending on boolean parameter
  const sharedRef = doc(db, `users/${userID}/food`, product);
  await updateDoc(sharedRef, {
  isWasted: boolean,
  });
}

//should be called every time pantry accessed
//checks for all nonwasted foods where current date is past use by date
export async function updateExpired(userID) {
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef, where("useBy", "<=", Timestamp.now()), where("isWasted", "==", false));
  const exp = [];
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    exp.push(doc.id);
  });
  for(const id of exp){
    await updateWasted(userID, id, true);
  }
}

//deletes product from pantry takes user id product id as string
export async function removeProduct(userID, product){
  const foodRef = doc(collection(db, `users/${userID}/food`), product);
  await deleteDoc(foodRef);
}

//updates shared takes userid and product id as string and boolean
export async function updateShared(userID, product, boolean) {
  //updates a users product to not shared or shared depending on boolean
  const sharedRef = doc(db, `users/${userID}/food`, product);
  await updateDoc(sharedRef, {
    shared: boolean
  });
}

//updates isLow, takes userid product id as string and boolean
export async function updateIsLow(userID, product, boolean){
  //updating islow is true or false depending on the boolean parameter
  const unsharedRef = doc(db, `users/${userID}/food`, product);
  await updateDoc(unsharedRef, {
    isLow: boolean
  });
}



//IGNORE - TESTING FUNCTIONS
export async function clearFood(userID){
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef);
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    removeProduct(userID, doc.id);
  });
}
export async function makeTestPantry(){
  addFood("test123", "Cheese", true, "2023 04 15", true, "2023 03 07")
  addFood("test123", "Ham", false, "2023 03 23", false, "2023 03 07")
  addFood("test123", "Onion", true, "2023 09 15", false, "2023 03 07")
  addFood("test123", "Soup", false, "2025 05 04", true, "2023 03 03")
}

