import { cloudDB } from "./firebaseConfig";

const db = cloudDB;

export  function getTweets() {
  const posts = [];
  const firstResponse =  db
    .collection("tweet")
    .orderBy("date", "desc")
    .limit(10)
    
    return firstResponse.get()
    .then(function (documentSnapshots) {
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log("last", lastVisible);
      const nextResponse = db
        .collection("tweet")
        .orderBy("date", "desc")
        .startAfter(lastVisible)
        .limit(10);
        documentSnapshots.forEach(function (doc) {
          posts.push({ id: doc.id, ...doc.data() });
        });
      console.log(firstResponse);
      console.log(nextResponse);
    });
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
