
import { addUserToDB } from "./api";

const firebase = require("firebase");
require("firebase/firestore");

const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const loginByEmail = (e, email, password) => {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((r) => {
      console.log(r.user);
      console.log(r.user.uid);
    })
    .catch((e) => alert(e.message));
};

export const signupByEmail = (e, email, password) => {
  e.preventDefault();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
};

export const loginByGoogle = (history) => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(async (result) => {
      console.log(result.credential.accessToken);
      const user = result.user;
      console.log(user);
      localStorage.setItem("userid", user.uid);
      localStorage.setItem("photoURL", user.photoURL);
      localStorage.setItem("userName", user.displayName);
      //TODO if userid exists IN USERS db then use update IF NULL use set
      addUserToDB(user);
    })
    .then(() => {
      history.push("/home");
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      alert(
        `error.code:
          ${errorCode},
          errorMessage:
          ${errorMessage},
          email:
          ${email},
          credential:
          ${credential}`
      );
    });
};

export const logout = () => {
  console.log("you have logged out your account");
  firebase.auth().signOut();
};
