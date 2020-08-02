import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { uploadTask } from "../lib/Firebase";

const UserPage = ({ props }) => {
  const [user, setState] = useState(
    window.localStorage.getItem("userName") || ""
  );
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const handleFireBaseUpload = (e) => {
    localStorage.setItem("userName", user);
    e.preventDefault();
    console.log("start of upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    uploadTask(imageAsFile);
  };

  const handleOnNameChange = (event) => {
    event.preventDefault();
    setState(event.target.value);
  };

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    console.log("on profile");
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  return (
    <Container>
      <Form className="user-page" onSubmit={handleFireBaseUpload}>
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
        <Form.Group>
          <Form.File
            className="position-relative"
            required
            name="file"
            label="Upload profile picture"
            onChange={handleUploadPhoto}
          />
        </Form.Group>
        <div className="text-right">
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
      {imageAsUrl.imgUrl && <img src={imageAsUrl.imgUrl} alt="user profile tag" />}
    </Container>
  );
};

export default UserPage;
