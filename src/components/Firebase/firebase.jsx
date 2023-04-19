import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNLuIxpIiQL9nZ14TaKLTAlTNAdLwwZU8",
  authDomain: "plant-pests-detection.firebaseapp.com",
  databaseURL: "https://plant-pests-detection-default-rtdb.firebaseio.com",
  projectId: "plant-pests-detection",
  storageBucket: "plant-pests-detection.appspot.com",
  messagingSenderId: "858834929468",
  appId: "1:858834929468:web:a1ca5b0e31ac6cf14b4039",
  measurementId: "G-D1RNSY4QY7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestoredb = getFirestore(app);
export const storage = getStorage(app);