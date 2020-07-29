import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar = (props) => (
  <Container>
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Navbar.Brand href="/home">
        My Tweet
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link
          to="/home"
          className={styles.link}
        >
          Home
        </Link>
        <Link
          to="/profile"
          className={styles.link}
        >
          Profile
        </Link>
        <Link to="/Signup" className={styles.link}>
          Signup
        </Link>
        <Link to="/Login" className={styles.link}>
          Login
        </Link>
        <Link to="/Logout" className={styles.link}>
          Logout
        </Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  </Container>
);
