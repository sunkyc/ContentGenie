// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6x39MWXvOoc95yr334E47WYIYr3tRFdM",
  authDomain: "contentgenie-96bd2.firebaseapp.com",
  projectId: "contentgenie-96bd2",
  storageBucket: "contentgenie-96bd2.appspot.com",
  messagingSenderId: "487578287059",
  appId: "1:487578287059:web:ac687f8ec57fe09f1e4d26",
  measurementId: "G-KQ374B14DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
