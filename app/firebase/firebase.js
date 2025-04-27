// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbgYuPlFPBuVbH_M5ipTx2pVPjGfFhW1g",
  authDomain: "fir-authemailusers.firebaseapp.com",
  projectId: "fir-authemailusers",
  storageBucket: "fir-authemailusers.firebasestorage.app",
  messagingSenderId: "243507944021",
  appId: "1:243507944021:web:1e089c4ae499afeba252dc",
  measurementId: "G-F9B0E6K5FE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};