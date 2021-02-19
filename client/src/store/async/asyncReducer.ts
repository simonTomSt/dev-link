import {
  AsyncActions as Actions,
  AlertTypes,
  LoaderType,
  AsyncStateModel as StateModel,
  asyncTypes,
} from "./asyncModels";

const initialState: StateModel = {
  isAlert: true,
  alertType: AlertTypes.Error,
  alertMsg: null,
  isLoading: false,
  loaderType: LoaderType.Bar,
};

export const asyncReducer = (
  state = initialState,
  { type, payload }: Actions
) => {
  switch (type) {
    case asyncTypes.SET_ALERT: {
      return {
        ...state,
        ...payload,
        isLoading: false,
        loaderType: LoaderType.Bar,
      };
    }
    case asyncTypes.REMOVE_ALERT:
      return {
        ...state,
        isAlert: false,
        alertType: AlertTypes.Dark,
      };

    case asyncTypes.SET_LOADING:
      return {
        ...state,
        ...payload,
        isLoading: true,
        alertType: AlertTypes.Dark,
      };
    case asyncTypes.STOP_LOADING:
      return {
        ...state,
        isLoading: false,
        loaderType: LoaderType.Bar,
      };
    default:
      return state;
  }
};

export const asyncStore = () => initialState;
