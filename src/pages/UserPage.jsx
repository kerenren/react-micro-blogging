import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { firebase, storage } from "../lib/Firebase";
import { updatePhotoURL } from "../lib/User";
import styles from "../style/UserPage.module.css";

const UserPage = ({ props }) => {
  const [user, setState] = useState(
    window.localStorage.getItem("userName") || ""
  );

  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const handleFireBaseUpload = (e) => {
    localStorage.setItem("userName", user);
    e.preventDefault();
    console.log("start of upload");
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

    var file = imageAsFile;

    var metadata = {
      contentType: "image/jpeg",
    };

    var uploadTask = storage.ref(`/images/${file.name}`).put(file, metadata);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        alert(error.message);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          setImageAsUrl(() => downloadURL);
          const user = firebase.auth().currentUser;
          updatePhotoURL(user, downloadURL);
        });
      }
    );
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
      {imageAsUrl !== "" && (
        <img
          className={styles.profile_img}
          src={imageAsUrl}
          alt="user profile tag"
        />
      )}
    </Container>
  );
};

export default UserPage;
