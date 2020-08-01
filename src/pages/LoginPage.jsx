import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import fire from "../lib/Fire.js";
import { useHistory, useLocation } from "react-router-dom";
import googleLogin from "../img/btn_google_signin.png";
import googleIcon from "../img/btn_google_dark_normal_ios.png";

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
  const db = firebase.firestore();
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/home");
    }, 10000);
  }, []);

  const loginByGoogle = () => {
    fire
      .auth()
      .signInWithPopup(googleProvider)
      .then(async (result) => {
        console.log(result.credential.accessToken);
        const user = result.user;
        console.log(user);
        localStorage.setItem("userid", user.uid);
        localStorage.setItem("photoURL", user.photoURL);
        localStorage.setItem("userName", user.displayName);
        //TODO if userid exists IN USERS db then use update IF NULL use set
        await db.collection("users").doc(user.uid).set({
          id: user.uid,
          userName: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photoURL: user.photoURL,
        });
      })
      .then(() => {
        history.push("/home");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        alert(
          `error.code:
          ${errorCode},
          errorMessage:
          ${errorMessage},
          email:
          ${email},
          credential:
          ${credential}`
        );
      });
  };

  function onSignIn(googleUser) {
    console.log("Signing In!");
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  const location = useLocation();

  return (
    <div>
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
              {location.pathname === "/login"
                ? "Sign in by email "
                : "Sign up by email "}
            </Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <div
              className="g-signin2"
              onClick={loginByGoogle}
              data-onsuccess="onSignIn"
            >
              {location.pathname === "/login" ? (
                <img
                  src={googleLogin}
                  alt="log in by google"
                  className="loginGoogleBtn"
                />
              ) : (
                <button onClick={loginByGoogle}>
                  <img
                    src={googleIcon}
                    alt="signup by google"
                    className="signUpGoogleIcon"
                  />
                  Sign up by Google
                </button>
              )}
            </div>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
