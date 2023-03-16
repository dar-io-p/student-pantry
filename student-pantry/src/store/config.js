import { initializeApp } from 'firebase/app';
import { doc, getFirestore, collection, setDoc, getDocs , Timestamp, getDoc, updateDoc, deleteDoc, deleteField} from "firebase/firestore"; 
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
owner: userID
id: product,
isLow: low,
shared: shared,
useBy: Timestamp.fromDate(new Date(useby)),
purchaseDate: purchaseDate,
}
*/

export async function addFood(userID, product, low, useby, shared, purchaseDate){
  //adds food item document by the name of product to the food list of a certain username 
  const collectionRef = collection(db, `users/${userID}/food`);
  const fooditem = doc(collectionRef, product);
  await setDoc(fooditem, {
    owner: userID,
    id: product,
    isLow: low,
    shared: shared,
    useBy: new Date(useby),
    purchaseDate: new Date(purchaseDate),
  });
}

//returns list of unshared unwasted food items
export async function getIndividual(userID){
  //get all individual foods for a certain id <-- gets products that would be in individual pantry
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef ,where("shared", "==", false));
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
  var q = query(collectionRef, where("shared", "==", true));
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
  const collectionRef = collection(db, `users/${userID}/wasteHistory`);
  var q = query(collectionRef);
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
  var q = query(collectionRef);
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
  const collectionRef = collection(db, `users/${userID}/wasteHistory`);
  var q = query(collectionRef, where("shared", "==", false));
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
  const collectionRef = collection(db, `users/${userID}/wasteHistory`);
  const wastedshared = [];
  var q = query(collectionRef, where("shared", "==", true));
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    wastedshared.push(doc.data());
  });
  return wastedshared
}

//returns list of food items for all users in a pantry
export async function getSharedPantry(groupID) {
  var querySnapshot = await getDocs(collection(db, `groups/${groupID}/members`));
    const items = [];
    await Promise.all(
      querySnapshot.docs.map(async (userDoc) => {
        const foodCollectionRef = collection(db, `users/${userDoc.id}/food`);
        const foodQuerySnapshot = await getDocs(query(foodCollectionRef));
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
export async function updateWasted(userID, product){
  const foodRef = doc(db, `users/${userID}/food`, product);
  const foodData = await getDoc(foodRef)
  const wasteRef = collection(db, `users/${userID}/wasteHistory`);
  const newRef = doc(wasteRef, product);
  await setDoc(newRef, foodData.data());
  await removeProduct(userID, product);
}

//should be called every time pantry accessed
//checks for all nonwasted foods where current date is past use by date
export async function updateExpired(userID) {
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef, where("useBy", "<=", Timestamp.now()));
  const exp = [];
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    exp.push(doc.id);
  });
  for(const id of exp){
    await updateWasted(userID, id);
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

export async function joinGroup(groupID, userID) {
  const groupRef = doc(db, `groups/${groupID}`);
  const userRef = doc(db, `users`, userID);
  
  const groupDoc = await getDoc(groupRef);
  if (!groupDoc.exists()) {
    return false;
  }

  await updateDoc(userRef, {
    groupID: groupID
  });

  const membersRef = collection(db, `groups/${groupID}/members`);
  const MemberRef = doc(membersRef, userID);
  await setDoc(MemberRef, {
    id: userID
  });

  return true;
}


export async function leaveGroup(groupID, userID) {
  const groupRef = doc(db, `groups/${groupID}`);
  const userRef = doc(db, `users/${userID}`);

  const groupDoc = await getDoc(groupRef);
  if (!groupDoc.exists()) {
    return false;
  }

  const userDoc = await getDoc(userRef);
  const userGroupID = userDoc.data().groupID;

  await updateDoc(userRef, {
    groupID: deleteField(),
  });

  const membersRef = collection(db, `groups/${groupID}/members`);
  const MemberRef = doc(membersRef, userID);
  await deleteDoc(MemberRef);

  const groupMembers = await getDocs(membersRef);
  if (groupMembers.empty) {
    await deleteDoc(groupRef);
  }
  return true;
}

export async function createGroup(groupID, userID) {
  const groupsRef = collection(db, `groups`);
  const newGroupRef = doc(groupsRef, groupID.toString());
  await setDoc(newGroupRef, {});
  await joinGroup(groupID, userID);
  return true;
}

export async function isInGroup(userID) {
  const docRef = doc(db, 'users', userID);
  const docSnapshot = await getDoc(docRef);
  const docData = docSnapshot.data();

  if (docData && docData.hasOwnProperty('groupID')) 
  {
    return true;
  }
  else
  {
    return false;
  }
}

export async function getUsers(groupID)
{
const useritems = []
var querySnapshot = await getDocs(collection(db, `groups/${groupID}/members`));
  querySnapshot.forEach((doc) => {
    useritems.push(doc.id);
  });
  return useritems

}

export async function generateNumber() {
  let randomString = "";
  while (true) {
    randomString = "";
    const characters = '0123456789';
    const charLength = 10;
    for(let i = 0; i < 6; i++){
      randomString += characters.charAt(Math.floor(Math.random() * 10));
    }
    const groupDoc = await getDoc(doc(db, "groups", randomString));
    if (!groupDoc.exists()) {
      break;
    }
  }
  return randomString;
}

export async function getGroupID(userID){
  const inGroup = await isInGroup(userID);
  if(!inGroup){
    return false;
  }
  const docRef = doc(db, 'users', userID);
  const docSnapshot = await getDoc(docRef);
  const docData = docSnapshot.data();

  return docData.groupID;
}

export async function clearFood(userID){
    const collectionRef = collection(db, `users/${userID}/food`);
    var q = query(collectionRef);
    var querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      removeProduct(userID, doc.id);
    });
  }
  export async function makeTestPantry(){
    await addFood("test123", "Cheese", true, "2023 04 15", true, "2023 03 07")
    await addFood("test123", "Ham", false, "2023 03 23", false, "2023 03 07")
    await addFood("test123", "Onion", true, "2023 09 15", false, "2023 03 07")
    await addFood("test123", "Soup", false, "2025 05 04", true, "2023 03 03")
  }
  
  export async function makeTestPantryG1(){
    await addFood("testG1", "Cheese", true, "2023 04 15", true, "2023 03 07")
    await addFood("testG1", "Ham", false, "2023 03 23", false, "2023 03 07")
    await addFood("testG1", "Onion", true, "2023 09 15", false, "2023 03 07")
    await addFood("testG1", "Soup", false, "2025 05 04", true, "2023 03 03")
  }
  
  export async function makeTestPantryG2(){
    await addFood("testG2", "Pizza", false, "2023 04 15", true, "2023 03 07")
    await addFood("testG2", "Kimchi", true, "2023 03 23", true, "2023 03 07")
    await addFood("testG2", "Pepper", true, "2023 09 15", false, "2023 03 07")
    await addFood("testG2", "Pork", false, "2025 05 04", true, "2023 03 03")
  }
console.log(await isInGroup("test456"))
console.log(await getGroupID("test456"))