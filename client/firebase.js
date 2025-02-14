// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBaOh9FWIxInyCw1R2ULhf40qhWg1LeMqU",
  authDomain: "fir-f6dcf.firebaseapp.com",
  projectId: "fir-f6dcf",
  /////storageBucket: "fir-f6dcf.firebasestorage.app",
  storageBucket: "fir-f6dcf.appspot.com",

  messagingSenderId: "897348352787",
  appId: "1:897348352787:web:a8abf30beb61a37e81f8e6",
  measurementId: "G-0D9CY3NGYB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
