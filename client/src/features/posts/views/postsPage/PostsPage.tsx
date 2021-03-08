import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AsyncWrapper from "../../../../components/common/asyncWrapper/AsyncWrapper";
import { Container } from "react-bootstrap";
import CreatePost from "../createPost/CreatePost";
import PostBox from "../postBox/PostBox";
import { PostsStateModel } from "../../../../store/posts/postsModels";
import { RootState } from "../../../../store/configureStore/store";
import { getAllPosts } from "../../../../store/posts/postsActions";
import { getUserProfile } from "../../../../store/profiles/profilesActions";

export default function PostsPage() {
  const dispatch = useDispatch();
  const { posts } = useSelector<RootState, PostsStateModel>(
    (state) => state.posts
  );
  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getUserProfile());
  }, [dispatch]);
  return (
    <Container>
      <CreatePost />
      <AsyncWrapper>
        {posts?.map((post) => (
          <PostBox post={post} key={post._id} />
        ))}
      </AsyncWrapper>
    </Container>
  );
}
