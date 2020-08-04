import React, { Component } from "react";
import TweetPost from "../components/TweetPost";
import TweetForm from "../components/TweetForm";
import Container from "react-bootstrap/Container";
import { createTweetPost } from "../lib/api";
import Spinner from "react-bootstrap/Spinner";
import { MyContext } from "../context";
import { cloudDB } from "../lib/firebaseConfig";

class TweetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      errorMsg: null,
      monitoredTweets:[],
      onNewPost: (newPost) => this.handleOnNewPost(newPost),
    };
  }

  componentDidUpdate() {
    if (this.state.posts.length !== this.props.tweets.length) {
      this.setState({ monitoredTweets: this.props.tweets });
    }
  }

  handleOnNewPost(newPost) {
    this.setState({ loading: true });
    localStorage.setItem("list", JSON.stringify(newPost));
    console.log(newPost);
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
    const posts = [];
    const firstResponse = cloudDB
      .collection("tweet")
      .orderBy("date", "desc")
      .limit(10);
    firstResponse
      .get()
      .then(function (documentSnapshots) {
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        console.log("last", lastVisible);
        const nextResponse = cloudDB
          .collection("tweet")
          .orderBy("date", "desc")
          .startAfter(lastVisible)
          .limit(10);
        documentSnapshots.forEach(function (doc) {
          posts.push({ id: doc.id, ...doc.data() });
        });
        console.log(posts);
        this.setState({ posts: posts, loading: false });
        return nextResponse;
      })
      .then((nextResponse) => {
        this.setState({ loading: true });
        nextResponse.get().then(function (documentSnapshots) {
          documentSnapshots.forEach(function (doc) {
            posts.push({ id: doc.id, ...doc.data() });
          });
          this.setState({ posts: posts, loading: false });
          console.log(posts);
        });
      });
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
