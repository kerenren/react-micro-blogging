import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import TweetPage from "./pages/TweetPage";
import { NavBar } from "./components/NavBar";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import { cloudDB } from "./lib/firebaseConfig";
import { UserContext } from "./context";

function App() {
  const [user, setState] = useState(
    window.localStorage.getItem("userName") || null
  );
  const [tweets, setTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const logout = () => setCurrentUser(null);

  useEffect(() => {
    const firebase = require("firebase");
    function authListner() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setState(user);
          setCurrentUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
          });
        } else {
          setState(null);
        }
      });
    }

    function tweetListner() {
      const newTweet = [];
      cloudDB
        .collection("tweet")
        .orderBy("date", "desc")
        .onSnapshot(function (snapshot) {
          snapshot.docChanges().forEach(function (change) {
            newTweet.push(change.doc.data());
          });
          setTweets(() => [...newTweet]);
        });
    }
    const unsubscribeTweetListner = cloudDB
      .collection("tweet")
      .onSnapshot(function () {
        setTweets(() => []);
      });

    authListner();
    tweetListner();
    return unsubscribeTweetListner();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
        <Router>
          <NavBar user={user} />
          <Container fluid="sm">
            <Switch>
              <Route path="/profile">
                <UserPage />
              </Route>
              <Route path="/home">
                {user ? <TweetPage tweets={tweets} /> : <LoginSignupPage />}
              </Route>
              <Route path="/login">
                {user ? <TweetPage tweets={tweets} /> : <LoginSignupPage />}
              </Route>
              <Route path="/signup">
                <LoginSignupPage />
              </Route>
              <Route path="/logout">
                <LoginSignupPage />
              </Route>
            </Switch>
          </Container>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
