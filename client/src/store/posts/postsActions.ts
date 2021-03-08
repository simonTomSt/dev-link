import {
  CommentSchema,
  PostSchema,
} from "./../../features/posts/models/formSchema";
import {
  setError,
  setSpinnerLoading,
  stopLoading,
} from "../async/asyncActions";

import { Dispatch } from "redux";
import { PostsTypes } from "./postsModels";
import axios from "axios";
import { axiosConfig } from "../../app/config/axiosConfig";

export const getAllPosts = () => async (dispatch: Dispatch) => {
  dispatch(setSpinnerLoading());
  try {
    const res = await axios.get("/api/posts", axiosConfig);
    dispatch({
      type: PostsTypes.GET_POSTS,
      payload: res.data,
    });
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setError("Failed to load posts"));
    dispatch(stopLoading());
  }
};

export const createPost = (payload: PostSchema) => async (
  dispatch: Dispatch
) => {
  const body = JSON.stringify(payload);
  dispatch(setSpinnerLoading());
  try {
    const res = await axios.post("/api/posts", body, axiosConfig);
    dispatch({
      type: PostsTypes.CREATE_POST,
      payload: res.data,
    });
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setError("Failed to create post"));
    dispatch(stopLoading());
  }
};

export const getMyPosts = () => async (dispatch: Dispatch) => {
  dispatch(setSpinnerLoading());
  try {
    const res = await axios.get("/api/posts/user", axiosConfig);
    dispatch({
      type: PostsTypes.GET_MY_POSTS,
      payload: res.data,
    });
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setError("Failed to load posts"));
    dispatch(stopLoading());
  }
};

export const likePost = (payload: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${payload}`, {}, axiosConfig);
    dispatch({
      type: PostsTypes.LIKE_POST,
      payload: res.data,
    });
  } catch (error) {}
};
export const unLikePost = (payload: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.put(
      `/api/posts/unlike/${payload}`,
      {},
      axiosConfig
    );
    dispatch({
      type: PostsTypes.UNLIKE_POST,
      payload: res.data,
    });
  } catch (error) {}
};

export const getSinglePost = (payload: string) => async (
  dispatch: Dispatch
) => {
  dispatch(setSpinnerLoading());
  try {
    const res = await axios.get(`/api/posts/single/${payload}`, axiosConfig);
    dispatch({
      type: PostsTypes.GET_SINGLE_POST,
      payload: res.data,
    });
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setError("Failed to load posts"));
    dispatch(stopLoading());
  }
};

export const commentPost = (payload: {
  id: string;
  body: CommentSchema;
}) => async (dispatch: Dispatch) => {
  const body = JSON.stringify(payload.body);
  dispatch(setSpinnerLoading());

  try {
    await axios.post(`/api/posts/comment/${payload.id}`, body, axiosConfig);
    dispatch({
      type: PostsTypes.COMMENT_POST,
    });
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setError("Failed to comment posts"));
    dispatch(stopLoading());
  }
};

export const deleteComment = (payload: {
  id: string;
  postId: string;
}) => async (dispatch: Dispatch) => {
  dispatch(setSpinnerLoading());

  try {
    await axios.delete(
      `/api/posts/comment/${payload.postId}/${payload.id}`,
      axiosConfig
    );
    dispatch({
      type: PostsTypes.DELETE_COMMENT,
    });
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setError("Failed to delete comment"));
    dispatch(stopLoading());
  }
};
