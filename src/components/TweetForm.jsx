import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class TweetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      text: "",
      createdAt: "",
      userName: "",
    };
  }

  render() {
    return (
      <Form>
        <Form.Control type="text" placeholder="What you have in mind..." />
        <Button variant="primary" type="submit">
          Tweet
        </Button>
      </Form>
    );
  }
}

export default TweetForm;
