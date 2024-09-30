import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCUcAeQLT4DK4ECh_f7YpZ5CjZ-X46EKpc",
  authDomain: "netflix-clone-b9818.firebaseapp.com",
  projectId: "netflix-clone-b9818",
  storageBucket: "netflix-clone-b9818.appspot.com",
  messagingSenderId: "591995923321",
  appId: "1:591995923321:web:fe8abcfb55a78119501da8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); /*creating auth*/
const db = getFirestore(app); /*creating database*/

// user signup function
const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signUp, logout };
