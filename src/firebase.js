// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import dotenv from "dotenv";
dotenv.config();
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "virtual-incubator-1d7dd.firebaseapp.com",
  projectId: "virtual-incubator-1d7dd",
  storageBucket: "virtual-incubator-1d7dd.appspot.com",
  messagingSenderId: "441254254831",
  appId: "1:441254254831:web:50b7d7ca31545bd67a631a",
  measurementId: "G-X4QVHNDNLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
};

export { auth, googleProvider, signInWithGoogle, logout };
