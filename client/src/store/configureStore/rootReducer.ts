import { asyncReducer } from "../async/asyncReducer";
import { authReducer } from "../auth/authReducer";
import { combineReducers } from "redux";
import { profilesReducer } from "./../profiles/profilesReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  async: asyncReducer,
  profiles: profilesReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
