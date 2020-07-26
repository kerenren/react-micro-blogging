import React, { Component } from "react";
import TweetPost from "./TweetPost";
import TweetForm from "./TweetForm";
import Container from "react-bootstrap/Container";

class TweetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  handleOnNewPost(newPost) {
    this.setState((state) => {
      return {
        posts: [...state.posts, newPost],
      };
    });
  }
  render() {
    return (
      <Container>
        <TweetForm onNewPost={(newPost) => this.handleOnNewPost(newPost)} />
        <TweetPost posts={this.state.posts} />
      </Container>
    );
  }
}

export default TweetPage;
