// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA334u4bdtdEQzjyPGWei7rBS-8RyF27-c",
  authDomain: "foodybackendserver.firebaseapp.com",
  projectId: "foodybackendserver",
  storageBucket: "foodybackendserver.appspot.com",
  messagingSenderId: "225967699350",
  appId: "1:225967699350:web:f09a6952517c3a7f4f99b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);