import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import TweetPage from "./pages/TweetPage";
import { NavBar } from "./components/NavBar";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import fire from "./lib/Fire";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/signUpPage";

function App() {
  const [user, setState] = useState(
    window.localStorage.getItem("userName") || null
  );

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
          <NavBar />
          <Switch>
            <Route path="/profile">
              <UserPage />
            </Route>
            <Route path="/home">{user ? <TweetPage /> : <LoginPage />}</Route>
            <Route path="/login">{user ? <TweetPage /> : <LoginPage />}</Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/logout">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
