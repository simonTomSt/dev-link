import {
  PostsActions as Actions,
  PostsStateModel,
  PostsTypes,
} from "./postsModels";

const initialState: PostsStateModel = {
  posts: [],
  myPosts: [],
};

export const postsReducer = (
  state = initialState,
  { type, payload }: Actions
) => {
  switch (type) {
    case PostsTypes.GET_POSTS: {
      return { ...state, posts: payload };
    }
    case PostsTypes.CREATE_POST: {
      return { ...state, posts: payload };
    }
    case PostsTypes.GET_MY_POSTS: {
      return { ...state, myPosts: payload };
    }
    default:
      return state;
  }
};
