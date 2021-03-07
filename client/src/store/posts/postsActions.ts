import {
  setError,
  setSpinnerLoading,
  stopLoading,
} from "../async/asyncActions";

import { Dispatch } from "redux";
import { PostSchema } from "./../../features/posts/models/formSchema";
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
