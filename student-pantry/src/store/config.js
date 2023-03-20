import { initializeApp } from 'firebase/app';
import { doc, getFirestore, collection, setDoc, getDocs , Timestamp, getDoc, updateDoc, deleteDoc, deleteField, query, where} from "firebase/firestore"; 
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDADBZ0U_i7OPlgIdu1t5wgz8NJT9ifzU0",
  authDomain: "pantryapp2.firebaseapp.com",
  projectId: "pantryapp2",
  storageBucket: "pantryapp2.appspot.com",
  messagingSenderId: "535500183633",
  appId: "1:535500183633:web:82a8874e764ca6d1698070",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

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

export function isValidProduct(product){
  if(typeof(product) == 'string' && /^[A-Za-z\s]*$/.test(product)){
    return true;
  }
  else{
    return false;
  }
}

//adds food item document by the name of product to the food list of a certain username 
export async function addFood(userID, product, low, useby, shared, purchaseDate){
  if(!isValidProduct(product) ||  (typeof(low) != 'boolean') || !(useby instanceof Date) || (typeof(shared) != 'boolean') ||  !(purchaseDate instanceof Date)) return false;
  const userRef = doc(db, `users/${userID}`);
  const collectionRef = collection(db, `users/${userID}/food`);

  if(!(await getDoc(userRef)).exists()) return false;

  const fooditem = doc(collectionRef, product);
  await setDoc(fooditem, {
    owner: userID,
    id: product,
    isLow: low,
    shared: shared,
    useBy: new Date(useby),
    purchaseDate: new Date(purchaseDate),
  });
  return true;
}

//returns list of shared unwasted food items
export async function getShared(userID) {
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
export async function getFood(userID) {
  //returns which products are not wasted for a certain user
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef);
  const food = [];
  var querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    food.push(doc.data());
  });
  return food;
}

//returns list of food items for all users in a pantry
export async function getSharedPantry(groupID) {
  var querySnapshot = await getDocs(collection(db, `groups/${groupID}/members`));
  var items = [];
  var members = [];
  querySnapshot.forEach((userDoc) => {
    members.push(userDoc.id)
  })
  for(const user of members){
    var userData = await getShared(user);
    items = items.concat(userData);
  }
  return items;
}

// moves item to wasteHistory
export async function updateWasted(userID, product){
  if(!isValidProduct(product));
  const foodRef = doc(db, `users/${userID}/food`, product);
  const foodData = await getDoc(foodRef)
  if(!foodData.exists()) return false;

  const wasteRef = collection(db, `users/${userID}/wasteHistory`);
  const newRef = doc(wasteRef, product);
  await setDoc(newRef, foodData.data());
  await removeProduct(userID, product);
  return true;
}


//should be called every time pantry accessed
//checks for all nonwasted foods where current date is past use by date
export async function updateExpired(userID) {
  const collectionRef = collection(db, `users/${userID}/food`);
  var q = query(collectionRef, where("useBy", "<=", Timestamp.now()));
  var querySnapshot = await getDocs(q);
  const exp = [];
  querySnapshot.forEach((doc) => {
    exp.push(doc.id);
  });
  for (const id of exp) {
    await updateWasted(userID, id);
  }
}

//deletes product from pantry takes user id product id as string
export async function removeProduct(userID, product){
  if(!isValidProduct(product)) return false;
  const foodRef = doc(collection(db, `users/${userID}/food`), product);

  if(!(await getDoc(foodRef)).exists()) return false;

  await deleteDoc(foodRef);
  return true
}

//updates shared takes userid and product id as string and boolean
export async function updateShared(userID, product, boolean) {
  if(!isValidProduct(product) || typeof(boolean) != 'boolean') return false;
  const sharedRef = doc(db, `users/${userID}/food`, product);

  if(!(await getDoc(sharedRef)).exists()) return false;

  await updateDoc(sharedRef, {
    shared: boolean,
  });
  return true;
}

//updates isLow, takes userid product id as string and boolean
export async function updateIsLow(userID, product, boolean){
  if(!isValidProduct(product) || typeof(boolean) != 'boolean') return false;
  const unsharedRef = doc(db, `users/${userID}/food`, product);

  if(!(await getDoc(unsharedRef)).exists()) return false;

  await updateDoc(unsharedRef, {
    isLow: boolean,
  });
  return true;
}

export async function joinGroup(groupID, userID) {
  const groupRef = doc(db, `groups/${groupID}`);
  const userRef = doc(db, `users`, userID);

  const groupDoc = await getDoc(groupRef);
  if (!groupDoc.exists()) {
    return false;
  }

  await updateDoc(userRef, {
    groupID: groupID,
  });

  const membersRef = collection(db, `groups/${groupID}/members`);
  const MemberRef = doc(membersRef, userID);
  await setDoc(MemberRef, {
    id: userID,
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
  const docRef = doc(db, "users", userID);
  const docSnapshot = await getDoc(docRef);
  const docData = docSnapshot.data();

  if (docData && docData.hasOwnProperty("groupID")) {
    return true;
  } else {
    return false;
  }
}

export async function getUsers(groupID){
  const useritems = [];
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
    const characters = "0123456789";
    const charLength = 10;
    for (let i = 0; i < 6; i++) {
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

export async function getFoodAdvice(product){
  if(!isValidProduct(product)) return false;

  const foodRef = doc(db, `advice`, product);

  const food = await getDoc(foodRef);
  if(!food.exists) return false;

  return food.data();
}