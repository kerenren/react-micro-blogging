import firebaseConfig from "./firebaseConfig";
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);
require("firebase/firestore");
const db = firebase.firestore();

export async function getTweets() {
  const posts = [];
  const resp = await db
    .collection("tweet")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        posts.push({ ...doc.data() });
      });
      return posts;
    });
  return resp;
}

export function createTweetPost(post) {
  const result = db
    .collection("tweet")
    .add(post)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    });

  return result;
}

export function addUserToDB(user) {
  //TODO if userid exists IN USERS db then use update IF NULL use set
  db.collection("users").doc(user.uid).set({
    id: user.uid,
    userName: user.displayName,
    email: user.email,
    phone: user.phoneNumber,
    photoURL: user.photoURL,
  });
}
