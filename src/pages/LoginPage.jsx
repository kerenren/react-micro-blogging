import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import fire from "../lib/Fire.js";
import db from "../lib/Fire";
import { useHistory, Redirect } from 'react-router-dom'

export default function LoginPage(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const loginByEmail = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((u) => {})
      .catch((e) => console.log(e));
  };
  const firebase = require("firebase");
  var provider = new firebase.auth.GoogleAuthProvider();
  const loginByGoogle = () => {
    fire
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
  return (
    <Form>
      <Form.Group as={Row} controlId="formHorizontalEmail">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit" onClick={loginByEmail}>
            Sign in by email
          </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          {/* <Button
            type="submit"
            className="g-signin2"
            onClick={loginByGoogle}
            data-onsuccess="onSignIn"
          >
            Sign in by google gmail
          </Button> */}
          <div
            className="g-signin2"
            onClick={loginByGoogle}
            data-onsuccess="onSignIn"
          >
            Sign in by google gmail
          </div>
        </Col>
      </Form.Group>
    </Form>
  );
}
