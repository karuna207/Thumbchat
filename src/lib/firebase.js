// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration  
import dotenv from "dotenv"  
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "thumbchat-80bb0.firebaseapp.com",
  projectId: "thumbchat-80bb0",
  storageBucket: "thumbchat-80bb0.appspot.com",
  messagingSenderId: "603527080818",
  appId: "1:603527080818:web:4f12f5af777d3b172a0beb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  

export const auth=getAuth();
export const db=getFirestore(); 
export const storage=getStorage();