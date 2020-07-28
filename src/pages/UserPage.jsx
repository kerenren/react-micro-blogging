import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useState } from "react";

const UserPage = ({ props }) => {
  const handleNewUser = () => {
    localStorage.setItem("userName", user);
  };
  const [user, setState] = useState(window.localStorage.getItem("userName") || "Kelly");
  const handleOnNameChange = (event) => {
    event.preventDefault();
    setState(event.target.value);
  };

  return (
    <Container>
      <Form className="user-page" onSubmit={handleNewUser}>
        <h1>Profile</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            value={user}
            onChange={handleOnNameChange}
          />
        </Form.Group>
        <div className="text-right">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default UserPage;
