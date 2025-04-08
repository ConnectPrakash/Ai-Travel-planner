// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTt58MLqGWG38lKEbAZElL7DHUqCPIOK0",
  authDomain: "travel-planner-1b76f.firebaseapp.com",
  projectId: "travel-planner-1b76f",
  storageBucket: "travel-planner-1b76f.firebasestorage.app",
  messagingSenderId: "414323580865",
  appId: "1:414323580865:web:7fdb3ffceec974d7ad9940",
  measurementId: "G-VLY3B17EC9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);