import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import TweetPage from "./components/TweetPage";

function App() {
  return (
    <div className="App">
      <Container fluid="sm">
        <TweetPage /> 
      </Container>
    </div>
  );
}

export default App;
