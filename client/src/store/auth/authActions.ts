import { LoaderType, asyncTypes } from "../async/asyncModels";
import { AuthPayloadModel as PayloadModel, authTypes } from "./authModels";

import { AlertTypes } from "./../async/asyncModels";
import { Dispatch } from "redux";
import axios from "axios";

export const registerUser = ({ name, email, password }: PayloadModel) => async (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    dispatch({
      type: asyncTypes.SET_LOADING,
      payload: { loaderType: LoaderType.Spinner },
    });

    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: authTypes.AUTH_USER,
      payload: res.data,
    });
    dispatch({
      type: asyncTypes.STOP_LOADING,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: asyncTypes.SET_ALERT,
      payload: { alertMsg: "Failed to register", alertType: AlertTypes.Error },
    });
  }
};

export const logInUser = ({ email, password }: PayloadModel) => async (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    dispatch({
      type: asyncTypes.SET_LOADING,
      payload: { loaderType: LoaderType.Spinner },
    });

    const res = await axios.post("/api/auth/login", body, config);

    dispatch({
      type: authTypes.AUTH_USER,
      payload: res.data,
    });
    dispatch({
      type: asyncTypes.STOP_LOADING,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: asyncTypes.SET_ALERT,
      payload: { alertMsg: "Failed to login", alertType: AlertTypes.Error },
    });
  }
};
export function logOutUser(payload: PayloadModel) {
  return {
    type: authTypes.LOG_OUT_USER,
    payload,
  };
}

export function initAuth(payload: PayloadModel) {
  return { type: authTypes.AUTH_INIT, payload };
}
