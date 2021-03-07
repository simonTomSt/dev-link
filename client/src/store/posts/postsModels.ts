import { PostDoc } from "./../../../../server/src/models/Posts";

export interface PostsStateModel {
  posts: PostDoc[];
  myPosts: PostDoc[];
}

export enum PostsTypes {
  GET_POSTS = "GET_POSTS",
  GET_MY_POSTS = "GET_MY_POSTS",
  GET_SINGLE_POST = "GET_SINGLE_POST",
  DELETE_POST = "DELETE_POST",
  CREATE_POST = "CREATE_POST",
  LIKE_POST = "LIKE_POST",
  UNLIKE_POST = "UNLIKE_POST",
  COMMENT_POST = "COMMENT_POST",
  DELETE_COMMENT = "DELETE_COMMENT",
}

export interface GetPostsAction {
  type: PostsTypes.GET_POSTS;
  payload: any;
}
export interface CreatePostAction {
  type: PostsTypes.CREATE_POST;
  payload: any;
}
export interface GetMyPostAction {
  type: PostsTypes.GET_MY_POSTS;
  payload: any;
}

export type PostsActions = GetPostsAction | CreatePostAction | GetMyPostAction;
