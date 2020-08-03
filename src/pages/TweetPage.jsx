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
      posts: props.tweets,
      loading: false,
      errorMsg: null,
      onNewPost: (newPost) => this.handleOnNewPost(newPost),
    };
    this.interval = null;
  }

  componentDidUpdate() {
    if (this.state.posts !== this.props.tweets) {
      this.setState({ posts: this.props.tweets });
    }
  }
  
  handleOnNewPost(newPost) {
    this.setState({ loading: true });
    localStorage.setItem("list", JSON.stringify(newPost));
    createTweetPost(newPost)
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

  async componentDidMount() {
    this.setState({ loading: true });
    const posts = await getTweets();
    this.setState({ posts: posts, loading: false });
  }

  renderSpinner() {
    const variants = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
      "dark",
    ];
    return variants.map((variant) => {
      return <Spinner animation="grow" variant={variant} key={variant} />;
    });
  }
  render() {
    return (
      <MyContext.Provider value={this.state}>
        <Container>
          <TweetForm />
          {this.state.loading && <div>{this.renderSpinner()}</div>}
          {this.state.error ? <div>{this.state.error}</div> : <TweetPost />}
        </Container>
      </MyContext.Provider>
    );
  }
}

export default TweetPage;
