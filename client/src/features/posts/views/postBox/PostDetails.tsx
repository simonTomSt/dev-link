import { Card, Col, Row } from "react-bootstrap";

import { HandThumbsUp } from "react-bootstrap-icons";
import Moment from "react-moment";
import { PostDoc } from "../../../../../../server/src/models/Posts";
import React from "react";

interface PostDetailsProps {
  post?: PostDoc;
}
export default function PostDetails({ post }: PostDetailsProps) {
  return (
    <Card className="my-4 p-3 ">
      <Row>
        <Col md={3}>
          {" "}
          <img
            src={post?.avatar}
            alt="Owner portrait"
            className="img-fluid img-thumbnail"
            style={{ borderRadius: "50%", maxWidth: "150px" }}
          />
          <Card.Text className="ml-3">{post?.userName}</Card.Text>
        </Col>
        <Col md={9} className="mt-3">
          <Card.Title>{post?.name}</Card.Title>
          <Card.Text>{post?.text}</Card.Text>

          <p className="post-date">
            <span className="font-weight-bold">Date: </span>
            <Moment date={post?.date} format="DD/MM/YYYY" />
          </p>

          <Row className="post-actions">
            <HandThumbsUp color="royalblue" size={25} />
            {post?.likes?.length}
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
