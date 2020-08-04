import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import styles from "../style/NavBar.module.css";
import { logout } from "../lib/Firebase";

export const NavBar = (props) => (
  <Navbar bg="dark" variant="dark" className="mb-4">
    <Navbar.Brand href="/home">My Tweet</Navbar.Brand>
    <Nav className="mr-auto">
      <Link to="/home" className={styles.link}>
        Home
      </Link>
      {props.user && (
        <Link to="/profile" className={styles.link}>
          Profile
        </Link>
      )}
      {!props.user && (
        <Link to="/signup" className={styles.link}>
          Signup
        </Link>
      )}
      {!props.user && (
        <Link to="/login" className={styles.link}>
          Login
        </Link>
      )}
      {props.user && (
        <Link to="/logout" className={styles.link} onClick={logout}>
          Logout
        </Link>
      )}
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
);
