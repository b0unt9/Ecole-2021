import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4Yoe-3MP8MyDw5hUq_AmIzChf3atyDEA",
  authDomain: "todolist-f4eef.firebaseapp.com",
  projectId: "todolist-f4eef",
  storageBucket: "todolist-f4eef.appspot.com",
  messagingSenderId: "371596681487",
  appId: "1:371596681487:web:143ef4af0586bcafd35e7a",
  measurementId: "G-68FJMZPEZT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
