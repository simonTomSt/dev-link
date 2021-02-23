import {
  AuthActions,
  authTypes,
  authStateModel as stateModel,
} from "./authModels";
import { storageClear, storageSave } from "../../app/helpers/localStorage";

import { StorageNames } from "../../app/consts/StorageConsts";

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
    case authTypes.AUTH_USER: {
      storageSave(StorageNames.Token, payload.respToken);
      return {
        ...state,
        ...payload,
        isAuth: true,
      };
    }
    case authTypes.AUTH_FAILED: {
      storageClear(StorageNames.Token);
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    }
    case authTypes.AUTH_INIT: {
      if (payload) {
        return {
          ...state,
          isAuth: true,
        };
      }
      return {
        ...state,
        isAuth: false,
      };
    }
    case authTypes.LOG_OUT_USER: {
      storageClear(StorageNames.Token);
      return {
        ...state,
        isAuth: false,
      };
    }
    default: {
      return state;
    }
  }
};
