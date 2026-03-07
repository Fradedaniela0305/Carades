// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYDz2UpP4MjxGbJM94ajKJ79W2bRUqZ8E",
  authDomain: "carades-a825b.firebaseapp.com",
  projectId: "carades-a825b",
  storageBucket: "carades-a825b.firebasestorage.app",
  messagingSenderId: "712261045822",
  appId: "1:712261045822:web:1263590932f9b8f2024b6f",
  measurementId: "G-JBKHKMTP6T",
  databaseURL: 'https://carades-a825b-default-rtdb.firebaseio.com/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app)
