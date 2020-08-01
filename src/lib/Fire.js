import firebase from "firebase";

require("firebase/firestore");


const firebaseConfig = {
  apiKey: "AIzaSyBjjDHnZUDYDdphp79fjf6dKStum0G4HYE",
  authDomain: "react-micro-blogging-kerenren.firebaseapp.com",
  databaseURL: "https://react-micro-blogging-kerenren.firebaseio.com",
  projectId: "react-micro-blogging-kerenren",
  storageBucket: "react-micro-blogging-kerenren.appspot.com",
  messagingSenderId: "872347003798",
  appId: "1:872347003798:web:59d415c948dff4c4ed0bb7",
  measurementId: "G-YBCKH5EH9E",
};

const fire = firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

export default fire;


