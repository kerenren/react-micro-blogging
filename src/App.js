import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import TweetPage from "./pages/TweetPage";
import { NavBar } from "./components/NavBar";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";

function App() {
  const [user, setState] = useState(
    window.localStorage.getItem("userName") || null
  );
  const fire = require("firebase");
  useEffect(() => {
    authListner();
  }, []);

  function authListner() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setState(user);
      } else {
        setState(null);
      }
    });
  }

  return (
    <div className="App">
      <Container fluid="sm">
        <Router>
          <NavBar user={user} />
          <Switch>
            <Route path="/profile">
              <UserPage />
            </Route>
            <Route path="/home">
              {user ? <TweetPage /> : <LoginSignupPage />}
            </Route>
            <Route path="/login">
              {user ? <TweetPage /> : <LoginSignupPage />}
            </Route>
            <Route path="/signup">
              <LoginSignupPage />
            </Route>
            <Route path="/logout">
              <LoginSignupPage />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
