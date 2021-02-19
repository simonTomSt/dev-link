export enum authTypes {
  LOG_IN_USER = "LOG_IN_USER",
  LOG_OUT_USER = "LOG_OUT_USER",
  REGISTER_USER = "REGISTER_USER",
  AUTH_FAILED = " AUTH_FAILED",
}

export interface authStateModel {
  token?: string | null;
  isAuth: boolean | null;
  user: null;
}

export interface AuthPayloadModel {
  name: string;
  email: string;
  password: string;
}

export interface ActionLogIn {
  type: authTypes.LOG_IN_USER;
  payload: any;
}
export interface ActionFailedAuth {
  type: authTypes.AUTH_FAILED;
  payload: any;
}

export type AuthActions = ActionLogIn | ActionFailedAuth;
