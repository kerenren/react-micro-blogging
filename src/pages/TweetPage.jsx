import React, { useEffect, useState } from "react";
import TweetPost from "../components/TweetPost";
import TweetForm from "../components/TweetForm";
import Container from "react-bootstrap/Container";
import { createTweetPost } from "../lib/api";
import Spinner from "react-bootstrap/Spinner";
import { MyContext } from "../context";
import { cloudDB } from "../lib/firebaseConfig";
import BottomScrollListener from "react-bottom-scroll-listener";

function TweetPage(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newPost, setNewPost] = useState({});
  const [lastVisible, setLastVisible] = useState(null);

  useEffect(() => {
    if (posts[0] !== undefined && props.tweets[0] !== undefined) {
      if (posts[0].date !== props.tweets[0].date) {
        firstFetch();
      }
    }
  });

  useEffect(() => {
    try {
      firstFetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  async function firstFetch() {
    // setLoading(true);
    const firstResponse = await cloudDB
      .collection("tweet")
      .orderBy("date", "desc")
      .limit(10);
    let documentSnapshots = await firstResponse.get();

    let lastVisibleObj =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const postObj = [];
    documentSnapshots.forEach(function (doc) {
      postObj.push({ id: doc.id, ...doc.data() });
    });

    setPosts(postObj);
    setLastVisible(lastVisibleObj);
    setLoading(false);
  }

  async function moreFetch() {
    console.log("Retrieving additional Data");
    let additionalQuery = await cloudDB
      .collection("tweet")
      .orderBy("date", "desc")
      .startAfter(lastVisible)
      .limit(10);

    let documentSnapshots = await additionalQuery.get();

    let lastVisibleObj =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const postObj = [];
    documentSnapshots.forEach(function (doc) {
      postObj.push({ id: doc.id, ...doc.data() });
    });

    setPosts([...posts, ...postObj]);
    setLastVisible(lastVisibleObj);
    console.log("after more fetch, lastVisibleObj: ", lastVisibleObj);
    console.log("posts:", posts);
    setLoading(false);
  }

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
        <BottomScrollListener onBottom={moreFetch} />
        <TweetForm />
        {loading && <div>{renderSpinner()}</div>}
        {errorMessage ? <div>{errorMessage}</div> : <TweetPost />}
      </Container>
    </MyContext.Provider>
  );
}

export default TweetPage;
