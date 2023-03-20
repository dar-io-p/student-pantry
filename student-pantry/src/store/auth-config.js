import { auth, db } from "../store/config.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export async function registerUser(email, password, displayName) {
  await createUserWithEmailAndPassword(auth, email, password);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await updateProfile(user, { displayName: displayName });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User not signed in");
    }
  });
  const usersRef = collection(db, `users`);
  const newUserRef = doc(usersRef, displayName);
  await setDoc(newUserRef, {});
}

export async function changePassword() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        alert("Password reset email sent!");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("User not signed in");
    }
  });
}

export async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error);
  }
}
