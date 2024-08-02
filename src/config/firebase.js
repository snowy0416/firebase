import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage}  from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCVw6RvwDGxiExzgqbaBrMPHlZZlffvfug",
  authDomain: "fir-course-8f9cc.firebaseapp.com",
  projectId: "fir-course-8f9cc",
  storageBucket: "fir-course-8f9cc.appspot.com",
  messagingSenderId: "867321361245",
  appId: "1:867321361245:web:e742cd1e1f2480bc5eeeb4",
  measurementId: "G-KB3RQR73KE"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

