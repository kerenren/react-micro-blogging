import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import uuid from "react-uuid";
import Container from "react-bootstrap/Container";

class TweetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.onNewPost({
      id: uuid() + "",
      text: this.state.text,
      createdAt: Date.now(),
      userName: "Kelly",
    });
    this.setState({
      text: "",
    });
  }

  handlePostInputChange(event) {
    this.setState({
      text: event.target.value,
    });
  }
  render() {
    return (
      <Container className="input-form-container">
        <Form onSubmit={(event) => this.handleOnSubmit(event)} className="form">
          <Form.Control
            type="text"
            as="input"
            placeholder="What you have in mind..."
            onChange={(event) => this.handlePostInputChange(event)}
            value={this.state.text}
            required
            className="form-input "
          />
          <div className="text-right button-container">
            <Button variant="primary" type="submit" className="tweet-btn">
              Tweet
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

export default TweetForm;
