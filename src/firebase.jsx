// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmg4_K5kXY7UcjLmEwQYoKANv248ki4Io",
  authDomain: "test-763b2.firebaseapp.com",
  projectId: "test-763b2",
  storageBucket: "test-763b2.firebasestorage.app",
  messagingSenderId: "204306713790",
  appId: "1:204306713790:web:b9243cda087d5c9eb7a2ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();

export default app