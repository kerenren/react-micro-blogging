import React, { Component } from "react";
import TweetPost from "./TweetPost";
import TweetForm from "./TweetForm";
import Container from "react-bootstrap/Container";

class TweetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: JSON.parse(window.localStorage.getItem("posts")) || [],
    };
  }

  handleOnNewPost(newPost) {
    this.setState((state) => {
      return {
        posts: [newPost, ...state.posts],
      };
    });
  }

  render() {
    console.log("on render", this.state.posts);
    localStorage.setItem("posts", JSON.stringify(this.state.posts));

    return (
      <Container>
        <TweetForm onNewPost={(newPost) => this.handleOnNewPost(newPost)} />
        <TweetPost posts={this.state.posts} />
      </Container>
    );
  }
}

export default TweetPage;
