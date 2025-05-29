import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCxbNJENNIMWRN3bHBJORRxi0QsMekmmhw",
  authDomain: "movie-35288.firebaseapp.com",
  projectId: "movie-35288",
  storageBucket: "movie-35288.firebasestorage.app",
  messagingSenderId: "90445595891",
  appId: "1:90445595891:web:5514fe1e503ca703d72386",
  measurementId: "G-RB17VZCEG2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//This For Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export { auth, provider };