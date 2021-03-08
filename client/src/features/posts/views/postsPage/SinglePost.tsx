import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import Comments from "../comments/Comments";
import { Container } from "react-bootstrap";
import PostDetails from "../postBox/PostDetails";
import { PostsStateModel } from "../../../../store/posts/postsModels";
import { RootState } from "../../../../store/configureStore/store";
import { Routes } from "../../../../app/consts/RoutersConsts";
import { getSinglePost } from "../../../../store/posts/postsActions";

export default function SinglePost() {
  const history = useHistory();
  const location = useLocation<string>();
  const dispatch = useDispatch();
  const { single } = useSelector<RootState, PostsStateModel>(
    (state) => state.posts
  );

  useEffect(() => {
    !location.state && history.push(Routes.Posts);
    dispatch(getSinglePost(location.state));
  }, [location, dispatch, history]);

  return (
    <Container>
      <PostDetails post={single} />
      <Comments post={single} />
    </Container>
  );
}
