// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwv8vriRmWmeGRXHoAwcVJuADB0Cm4O5w",
  authDomain: "fir-authentication-98ea2.firebaseapp.com",
  projectId: "fir-authentication-98ea2",
  storageBucket: "fir-authentication-98ea2.firebasestorage.app",
  messagingSenderId: "491730494050",
  appId: "1:491730494050:web:d472a59b85490ce5ea273b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth};