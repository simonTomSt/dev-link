import { PostDoc } from "./../../../../server/src/models/Posts";

export interface PostsStateModel {
  posts: PostDoc[];
  myPosts: PostDoc[];
  single?: PostDoc;
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
  payload: PostDoc[];
}
export interface CreatePostAction {
  type: PostsTypes.CREATE_POST;
  payload: PostDoc[];
}
export interface GetMyPostAction {
  type: PostsTypes.GET_MY_POSTS;
  payload: PostDoc[];
}
export interface GetMyPostAction {
  type: PostsTypes.GET_MY_POSTS;
  payload: PostDoc[];
}
export interface CommentPostAction {
  type: PostsTypes.COMMENT_POST;
  payload: PostDoc[];
}
export interface LikePostAction {
  type: PostsTypes.LIKE_POST;
  payload: PostDoc[];
}
export interface UnLikePostAction {
  type: PostsTypes.UNLIKE_POST;
  payload: PostDoc[];
}
export interface GetSinglePost {
  type: PostsTypes.GET_SINGLE_POST;
  payload: PostDoc;
}
export interface GetSinglePost {
  type: PostsTypes.GET_SINGLE_POST;
  payload: PostDoc;
}
export interface DeleteComment {
  type: PostsTypes.DELETE_COMMENT;
  payload: PostDoc;
}

export type PostsActions =
  | GetPostsAction
  | CreatePostAction
  | GetMyPostAction
  | CommentPostAction
  | LikePostAction
  | UnLikePostAction
  | GetSinglePost
  | DeleteComment;
