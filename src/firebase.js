// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCxnO92q70kJXXzVtMZMPyO4EgC4UPOBuw",
  authDomain: "link-shortener-50284.firebaseapp.com",
  projectId: "link-shortener-50284",
  storageBucket: "link-shortener-50284.appspot.com",
  messagingSenderId: "766794696195",
  appId: "1:766794696195:web:21149e50746b7842d37036"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const linksCollection = collection(db, "linkPairs")