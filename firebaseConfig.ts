// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEcAuJ8smuEUM9cbSW_diyiXZPpUBpRM8",
  authDomain: "reactnative-1b885.firebaseapp.com",
  projectId: "reactnative-1b885",
  storageBucket: "reactnative-1b885.appspot.com",
  messagingSenderId: "74553658464",
  appId: "1:74553658464:web:662a2a800627d3934ec705",
  measurementId: "G-58C0XNY32S"
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREESTORE_DB = getFirestore(FIREBASE_APP)

