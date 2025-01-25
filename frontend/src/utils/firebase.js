// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5jF7O1WHRw3fQ-qPpMWwYVyE33lXzZBE",
  authDomain: "disneyplus-f5383.firebaseapp.com",
  projectId: "disneyplus-f5383",
  storageBucket: "disneyplus-f5383.firebasestorage.app",
  messagingSenderId: "161038591131",
  appId: "1:161038591131:web:4cf2a4f0a670e1cf77923e",
  measurementId: "G-VM7MG5T1Y8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider);
export const signOutWithGoogle = ()=> signOut (auth);