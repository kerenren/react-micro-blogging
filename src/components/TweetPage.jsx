import React, { Component } from "react";
import TweetPost from "./TweetPost";
import TweetForm from "./TweetForm";
import Container from "react-bootstrap/Container";
import { getTweets, CreateTweetPost } from "../lib/api";

class TweetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      errorMsg: null,
    };
  }

  async handleOnNewPost(newPost) {
    this.setState({ loading: true });
    CreateTweetPost(newPost)
      .then((res) => {
        console.log("success post!", res);
        this.setState((state) => {
          return {
            posts: [newPost, ...state.posts],
            loading: false,
            errorMsg: null,
          };
        });
      })
      .catch((err) => {
        if (err.response) {
          console.log(`client received an error response ${err.response}`);
        } else if (err.request) {
          console.log(
            `client never received a response, or request never left ${err.request}`
          );
        } else {
          console.log(`something went wrong: ${err}`);
        }
        this.setState({ errorMsg: err, loading: false });
      });
  }

  componentDidMount() {
    this.fetchTweets().then((response) => {
      const { tweets } = response.data;
      this.setState({ posts: tweets, loading: false });
    });
  }

  async fetchTweets() {
    const response = await getTweets();
    this.setState({ loading: true });
    return response;
  }

  render() {
    return (
      <Container>
        <TweetForm
          onNewPost={(newPost) => this.handleOnNewPost(newPost)}
          isLoading={this.state.loading}
        />
        {this.state.error ? (
          <div>{this.state.error}</div>
        ) : (
          <TweetPost posts={this.state.posts} />
        )}
      </Container>
    );
  }
}

export default TweetPage;
