import { asyncReducer } from "../async/asyncReducer";
import { authReducer } from "../auth/authReducer";
import { combineReducers } from "redux";
import { postsReducer } from "../posts/postsReducer";
import { profilesReducer } from "./../profiles/profilesReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  async: asyncReducer,
  profiles: profilesReducer,
  posts: postsReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
