import {
  PostsActions as Actions,
  PostsStateModel,
  PostsTypes,
} from "./postsModels";

const initialState: PostsStateModel = {
  posts: [],
  myPosts: [],
  single: undefined,
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
    case PostsTypes.COMMENT_POST: {
      return { ...state };
    }
    case PostsTypes.DELETE_COMMENT: {
      return { ...state };
    }
    case PostsTypes.LIKE_POST: {
      return { ...state };
    }
    case PostsTypes.UNLIKE_POST: {
      return { ...state };
    }
    case PostsTypes.GET_SINGLE_POST: {
      return { ...state, single: payload };
    }

    default:
      return state;
  }
};
