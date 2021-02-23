import { asyncReducer } from "../async/asyncReducer";
import { authReducer } from "../auth/authReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  auth: authReducer,
  async: asyncReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
