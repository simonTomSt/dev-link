import {
  AlertTypes,
  AsyncPayload,
  LoaderType,
  asyncTypes,
} from "./asyncModels";

export const setAlert = ({ alertMsg, alertType }: AsyncPayload) => {
  return {
    type: asyncTypes.SET_ALERT,
    payload: { alertMsg, alertType },
  };
};

export const setError = (message: string) => {
  return {
    type: asyncTypes.SET_ALERT,
    payload: { alertMsg: message, alertType: AlertTypes.Error },
  };
};
export const setBarLoading = () => {
  return {
    type: asyncTypes.SET_LOADING,
    payload: { loaderType: LoaderType.Bar },
  };
};
export const setSpinnerLoading = () => {
  return {
    type: asyncTypes.SET_LOADING,
    payload: { loaderType: LoaderType.Spinner },
  };
};

export const stopLoading = () => {
  return {
    type: asyncTypes.STOP_LOADING,
  };
};

export const clearError = () => {
  return {
    type: asyncTypes.REMOVE_ALERT,
  };
};
