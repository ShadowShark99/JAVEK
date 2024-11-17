// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore'; // If you're using Firestore
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use// https://firebase.google.com/docs/web/setup#available-libraries// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS8tSvYRSm_ieoNVzw0uz5taGu9l_9YeE",
  authDomain: "hackathon2024-ceaeb.firebaseapp.com",
  projectId: "hackathon2024-ceaeb",
  storageBucket: "hackathon2024-ceaeb.firebasestorage.app",
  messagingSenderId: "909768592105",
  appId: "1:909768592105:web:3ffda465d8aa8a0a337e78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore
let db = null;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch {
  console.error('Failed to initialize Firebase.');
}

export { app, auth, db };
