import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { MyContext } from "../context";

class TweetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleOnSubmit(event, setNewPost, handleOnNewPost) {
    event.preventDefault();
    setNewPost((newPost) => handleOnNewPost({
      content: this.state.content,
      date: new Date().toISOString(),
      userName: window.localStorage.getItem("userName"),
      userId: window.localStorage.getItem("userid"),
    }));
    this.setState({
      content: "",
    });
  }

  handlePostInputChange(event) {
    this.setState({
      content: event.target.value,
    });
  }
  render() {
    return (
      <MyContext.Consumer>
        {({ setNewPost, loading, handleOnNewPost }) => (
          <Container className="input-form-container">
            <Form
              onSubmit={(event) =>
                this.handleOnSubmit(event, setNewPost, handleOnNewPost)
              }
              className="form"
            >
              <Form.Control
                as="textarea"
                name="text"
                rows="14"
                cols="10"
                wrap="soft"
                value={this.state.content}
                required
                className="form-input "
                placeholder="What you have in mind..."
                onChange={(event) => this.handlePostInputChange(event)}
                disabled={loading}
              />
              <Container className="input-error-btn-container">
                <Row className="justify-content-center">
                  <Col className="text-left self-align-center">
                    {this.state.content.length > 140 && (
                      <div className="errorDiv">
                        The tweet can't contain more then 140 chars.
                      </div>
                    )}
                  </Col>
                  <Col xs={3} className="button-container text-right">
                    {loading ? (
                      <Button variant="primary" disabled>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        type="submit"
                        className="tweet-btn"
                        disabled={this.state.content.length > 140}
                      >
                        Tweet
                      </Button>
                    )}
                  </Col>
                </Row>
              </Container>
            </Form>
          </Container>
        )}
      </MyContext.Consumer>
    );
  }
}

export default TweetForm;
