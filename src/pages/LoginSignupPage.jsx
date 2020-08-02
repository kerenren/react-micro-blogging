import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useHistory, useLocation } from "react-router-dom";
import googleLogin from "../img/btn_google_signin.png";
import googleIcon from "../img/btn_google_dark_normal_ios.png";
import InputGroup from "react-bootstrap/InputGroup";
import { loginByEmail, signupByEmail, loginByGoogle } from "../lib/Firebase";

export default function LoginSignupPage(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [userName, setUsername] = useState(undefined);
  const location = useLocation();

  const handleSubmit = (e) => {
    if (location.pathname === "/login") {
      loginByEmail(e, email, password);
    } else {
      signupByEmail(e, email, password, userName);
    }
  };

  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.push("/home");
    }, 10000);
  }, []);

  return (
    <div>
      <Form>
        {location.pathname !== "/login" && (
          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={userName || ""}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </InputGroup>
            </Col>
          </Form.Group>
        )}
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
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={handleSubmit}>
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
              onClick={() => loginByGoogle(history)}
              data-onsuccess="onSignIn"
            >
              {location.pathname === "/login" ? (
                <img
                  src={googleLogin}
                  alt="log in by google"
                  className="loginGoogleBtn"
                />
              ) : (
                <button onClick={() => loginByGoogle(history)}>
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
