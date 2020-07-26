import React, from 'react';
import Card from "react-bootstrap/Card";

function TweetPost(props) {
  return (
    <Card>
        <Card.Subtitle className="mb-2 text-muted">{props.userName}</Card.Subtitle>
  <Card.Subtitle className="mb-2 text-muted">{props.createdAt}</Card.Subtitle>
  <Card.Body>T{props.text}</Card.Body>
    </Card>
  );
}

export default TweetPost;
