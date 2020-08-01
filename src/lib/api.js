import fire from "./Fire";

const firebase = fire;
// Required for side-effects
require("firebase/firestore");


var db = firebase.firestore();

export async function getTweets() {
  const posts = [];
  const resp = await db
    .collection("tweet")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
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
