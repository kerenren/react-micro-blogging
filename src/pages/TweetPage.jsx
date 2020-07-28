import React, { Component } from "react";
import TweetPost from "../components/TweetPost";
import TweetForm from "../components/TweetForm";
import Container from "react-bootstrap/Container";
import { getTweets, createTweetPost } from "../lib/api";
import Spinner from "react-bootstrap/Spinner";
import { MyContext } from "../context";

class TweetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      errorMsg: null,
      onNewPost: (newPost) => this.handleOnNewPost(newPost),
    };
    this.interval = null;
  }

  handleOnNewPost(newPost) {
    this.setState({ loading: true });
    localStorage.setItem("list", JSON.stringify(newPost));
  //   createTweetPost(newPost)
  //     .then((res) => {
  //       console.log("success post!", res);
  //       this.setState((state) => {
  //         return {
  //           posts: [newPost, ...state.posts],
  //           loading: false,
  //           errorMsg: null,
  //         };
  //       });
  //     })
  //     .catch((err) => {
  //       if (err.response) {
  //         console.log(`client received an error response ${err.response}`);
  //       } else if (err.request) {
  //         console.log(
  //           `client never received a response, or request never left ${err.request}`
  //         );
  //       } else {
  //         console.log(`something went wrong: ${err}`);
  //       }
  //       this.setState({ errorMsg: err, loading: false });
  //     });
  // }

  componentDidMount() {
    this.setState({ loading: true });
    this.interval = setInterval(() => {
      this.fetchTweets().then((response) => {
        const { tweets } = response.data;
        this.setState({ posts: tweets, loading: false });
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async fetchTweets() {
    const response = await getTweets();
    return response;
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Container>
          <TweetForm />
          {this.state.loading && (
            <div>
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="secondary" />
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
              <Spinner animation="grow" variant="light" />
              <Spinner animation="grow" variant="dark" />
            </div>
          )}
          {this.state.error ? <div>{this.state.error}</div> : <TweetPost />}
        </Container>
      </MyContext.Provider>
    );
  }
}

export default TweetPage;
