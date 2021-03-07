import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import { Container } from "react-bootstrap";
import CreatePost from "../createPost/CreatePost";
import PostBox from "../postBox/PostBox";
import { PostsStateModel } from "../../../../store/posts/postsModels";
import { RootState } from "../../../../store/configureStore/store";
import { getMyPosts } from "../../../../store/posts/postsActions";

export default function MyPosts() {
  const dispatch = useDispatch();
  const { myPosts } = useSelector<RootState, PostsStateModel>(
    (state) => state.posts
  );
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);
  return (
    <Container>
      <AsyncWrapper>
        {myPosts.map((post) => (
          <PostBox post={post} key={post._id} />
        ))}
      </AsyncWrapper>
    </Container>
  );
}
