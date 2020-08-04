import React, { useEffect, useState } from "react";
import TweetPost from "../components/TweetPost";
import TweetForm from "../components/TweetForm";
import Container from "react-bootstrap/Container";
import { createTweetPost } from "../lib/api";
import Spinner from "react-bootstrap/Spinner";
import { MyContext } from "../context";
import { cloudDB } from "../lib/firebaseConfig";

function TweetPage(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [monitoredTweets, setMonitoredTweets] = useState(null);
  const [newPost, setNewPost] = useState({});

  useEffect(() => {
    if (posts.length !== props.tweets.length) {
      setMonitoredTweets(props.tweets);
    }
  });

  function handleOnNewPost(newPost) {
    setLoading(true);
    localStorage.setItem("list", JSON.stringify(newPost));
    createTweetPost(newPost)
      .then((res) => {
        console.log("success post!", newPost, res);
        setPosts((newPost) => [newPost, ...posts]);
        firstFetch();
        setLoading(false);
        setErrorMessage(null);
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
        setErrorMessage(err);
        setLoading(false);
      });
  }

  function firstFetch() {
    const posts = [];
    const firstResponse = cloudDB
      .collection("tweet")
      .orderBy("date", "desc")
      .limit(10);
    firstResponse.get().then(function (documentSnapshots) {
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
      setPosts(posts);
      setLoading(false);
      return nextResponse;
    });
  }

  useEffect(() => {
    setLoading(true);
    const nextResponse = firstFetch();
    // .then((nextResponse) => {
    //   setLoading(true);
    //   nextResponse.get().then(function (documentSnapshots) {
    //     documentSnapshots.forEach(function (doc) {
    //       posts.push({ id: doc.id, ...doc.data() });
    //     });
    //     setPosts(posts);
    //     setLoading(false);
    //     console.log(posts);
    //   });
    // });
  }, []);

  function renderSpinner() {
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

  return (
    <MyContext.Provider value={{ posts, loading, setNewPost, handleOnNewPost }}>
      <Container>
        <TweetForm />
        {loading && <div>{renderSpinner()}</div>}
        {errorMessage ? <div>{errorMessage}</div> : <TweetPost />}
      </Container>
    </MyContext.Provider>
  );
}

export default TweetPage;
