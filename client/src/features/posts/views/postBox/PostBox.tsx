import { Button, Card, Col, Row } from "react-bootstrap";
import {
  ChatLeftDotsFill,
  HandThumbsUp,
  HandThumbsUpFill,
} from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import { likePost, unLikePost } from "../../../../store/posts/postsActions";
import { useDispatch, useSelector } from "react-redux";

import Moment from "react-moment";
import { PostDoc } from "../../../../../../server/src/models/Posts";
import { ProfilesStateModel } from "../../../../store/profiles/profilesModels";
import { RootState } from "../../../../store/configureStore/store";
import { Routes } from "../../../../app/consts/RoutersConsts";
import { useHistory } from "react-router-dom";

interface PostBoxProps {
  post: PostDoc;
}

export default function PostBox({ post }: PostBoxProps) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { profile } = useSelector<RootState, ProfilesStateModel>(
    (state) => state.profiles
  );
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    liked ? dispatch(unLikePost(post._id)) : dispatch(likePost(post._id));
    setLiked(!liked);
  };

  const redirectToDetails = () => {
    history.push({
      pathname: `${Routes.Post}/${post._id}`,
      state: post._id,
    });
  };

  useEffect(() => {
    const idAlreadyLiked = post?.likes?.find(
      (like) => like.user === profile?.user._id
    );
    idAlreadyLiked ? setLiked(true) : setLiked(false);
  }, [setLiked, post?.likes, profile?.user._id]);

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
          <Button variant="primary" size="sm" onClick={redirectToDetails}>
            See more...
          </Button>
        </Col>
        <Col md={9} className="mt-3">
          <Card.Title>{post.name}</Card.Title>
          <Card.Text>{post?.text}</Card.Text>

          <p className="post-date">
            <span className="font-weight-bold">Date: </span>
            <Moment date={post?.date} format="DD/MM/YYYY" />
          </p>

          <Row className="post-actions">
            <Col sm={4}>
              {liked ? (
                <HandThumbsUpFill
                  color="royalblue"
                  size={25}
                  onClick={toggleLike}
                  className="cursor-pointer"
                />
              ) : (
                <HandThumbsUp
                  color="royalblue"
                  size={25}
                  onClick={toggleLike}
                  className="cursor-pointer"
                />
              )}

              {post?.likes && post.likes.length > 0 && post.likes.length}
            </Col>
            <Col sm={4} className="ml-1">
              <ChatLeftDotsFill
                color="royalblue"
                size={25}
                onClick={redirectToDetails}
                className="cursor-pointer"
              />
              {post?.comments &&
                post.comments.length > 0 &&
                post.comments.length}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
