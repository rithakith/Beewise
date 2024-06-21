// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj3LmaPosbKBnL2t19kye_WXgTw_Vx8fE",
  authDomain: "beewise-6c96a.firebaseapp.com",
  projectId: "beewise-6c96a",
  storageBucket: "beewise-6c96a.appspot.com",
  messagingSenderId: "43870250613",
  appId: "1:43870250613:web:dc8368628662415f07fa3c",
  databaseURL: "https://beewise-6c96a-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const database = getDatabase(app);

export {auth,db,database}