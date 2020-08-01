import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import fire from "../lib/Fire.js";

export default function SignUpPage(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const signup = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {})
      .then((u) => {
        console.log(u);
      })
      .catch((e) => console.log(e));
  };

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
          <Button type="submit" onClick={signup}>
            Sign up
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
