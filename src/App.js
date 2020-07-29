import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import TweetPage from "./pages/TweetPage";
import { NavBar } from "./components/NavBar";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container fluid="sm">
        <Router>
          <NavBar />
          <Switch>
            <Route path="/profile">
              <UserPage />
            </Route>
            <Route path="/home">
              <TweetPage />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
