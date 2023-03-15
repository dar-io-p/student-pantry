import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDXyPTDhLR_oZ8eO6LdTjLHB72u2VFJu2s",
    authDomain: "registration-auth-798ef.firebaseapp.com",
    projectId: "registration-auth-798ef",
    storageBucket: "registration-auth-798ef.appspot.com",
    messagingSenderId: "539078212794",
    appId: "1:539078212794:web:96fae418fc20a9885c9683"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };