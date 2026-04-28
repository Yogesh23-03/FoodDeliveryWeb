// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "grodel-8d911.firebaseapp.com",
  projectId: "grodel-8d911",
  storageBucket: "grodel-8d911.firebasestorage.app",
  messagingSenderId: "446178840881",
  appId: "1:446178840881:web:96efb373ddfaec9da86010"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;