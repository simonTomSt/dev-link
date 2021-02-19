export interface AsyncStateModel {
  isAlert: boolean;
  alertType: string;
  alertMsg: string | null;
  isLoading: boolean;
  loaderType: LoaderType;
}

export enum LoaderType {
  Bar = 1,
  Spinner = 2,
  Custom = 3,
}

export enum AlertTypes {
  Success = "success",
  Info = "info",
  Error = "error",
  Warning = "warning",
  Dark = "dark",
  wWrn = "warn",
}

export enum asyncTypes {
  SET_ALERT = "SET_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",
  SET_LOADING = "SET_LOADING",
  STOP_LOADING = "STOP_LOADING",
}

export interface AsyncPayload extends AsyncStateModel {}

export interface SetAlertAction {
  type: asyncTypes.SET_ALERT;
  payload: AsyncPayload;
}
export interface RemoveAlertAction {
  type: asyncTypes.REMOVE_ALERT;
  payload: AsyncPayload;
}
export interface SetLoadingAction {
  type: asyncTypes.SET_LOADING;
  payload: AsyncPayload;
}
export interface StopLoadingAction {
  type: asyncTypes.STOP_LOADING;
  payload: AsyncPayload;
}

export type AsyncActions =
  | SetAlertAction
  | RemoveAlertAction
  | SetLoadingAction
  | StopLoadingAction;
