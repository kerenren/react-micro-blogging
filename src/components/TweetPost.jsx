import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MyContext } from "../context";

function TweetPost() {
  return (
    <MyContext.Consumer>
      {({ posts }) =>
        posts.map((post) => (
          <div className="post-container" key={post.id || post.date}>
            <Row>
              <Col>
                <h6 className="mb-2 text-muted text-left">{post.userName}</h6>
              </Col>
              <Col>
                <h6 className="mb-2 text-muted text-right">{post.date}</h6>
              </Col>
            </Row>
            <h4 className="post-text text-left">{post.content}</h4>
          </div>
        ))
      }
    </MyContext.Consumer>
  );
}

export default TweetPost;
