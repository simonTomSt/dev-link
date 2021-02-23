export enum authTypes {
  LOG_IN_USER = "LOG_IN_USER",
  LOG_OUT_USER = "LOG_OUT_USER",
  AUTH_USER = "AUTH_USER",
  AUTH_FAILED = " AUTH_FAILED",
  AUTH_INIT = " AUTH_INIT",
}

export interface authStateModel {
  token?: string | null;
  isAuth: boolean | null;
  user: null;
}

export interface AuthPayloadModel {
  name?: string;
  email: string;
  password: string;
}

export interface ActionAuthInit {
  type: authTypes.AUTH_INIT;
  payload: any;
}
export interface ActionAuthUser {
  type: authTypes.AUTH_USER;
  payload: any;
}
export interface ActionFailedAuth {
  type: authTypes.AUTH_FAILED;
  payload: any;
}
export interface ActionLogOut {
  type: authTypes.LOG_OUT_USER;
  payload: any;
}

export type AuthActions =
  | ActionAuthUser
  | ActionFailedAuth
  | ActionAuthInit
  | ActionLogOut;
