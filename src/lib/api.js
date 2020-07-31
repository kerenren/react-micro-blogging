const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBjjDHnZUDYDdphp79fjf6dKStum0G4HYE",
  authDomain: "react-micro-blogging-kerenren.firebaseapp.com",
  projectId: "react-micro-blogging-kerenren",
});

var db = firebase.firestore();

export async function getTweets() {
  const posts = [];
  const resp = await db
    .collection("tweet")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // console.log(doc.id, " => ", doc.data());
        const id = doc.id;
        posts.push({ id, ...doc.data() });
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
