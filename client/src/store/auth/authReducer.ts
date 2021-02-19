import {
  AuthActions,
  authTypes,
  authStateModel as stateModel,
} from "./authModels";

const initialState: stateModel = {
  token: localStorage.getItem("token"),
  isAuth: null,
  user: null,
};

export const authReducer = (
  state: stateModel = initialState,
  { type, payload }: AuthActions
) => {
  switch (type) {
    case authTypes.LOG_IN_USER || authTypes.REGISTER_USER: {
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    }
    case authTypes.AUTH_FAILED: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
