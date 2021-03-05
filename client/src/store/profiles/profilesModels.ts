import {
  EducationModel,
  ExpModel,
} from "./../../features/my-profile/models/formSchema";

import { ProfileDoc } from "../../../../server/src/models/Profile";
import { UserDoc } from "../../../../server/src/models/User";

export interface ProfileRespModel extends Omit<ProfileDoc, "user"> {
  user: {
    avatar: string;
    name: string;
    _id: string;
  };
  education: EducationModel[];
  experience: ExpModel[];
}

export interface ProfilesStateModel {
  profile?: ProfileRespModel;
  profiles?: ProfileRespModel[];
  repos?: any[];
  user?: UserDoc;
}

export enum ProfilesTypes {
  GET_PROFILE = "GET_PROFILE",
  CREATE_PROFILE = "CREATE_PROFILE",
  DELETE_PROFILE = "DELETE_PROFILE",
  CREATE_EDUCATION = "CREATE_EDUCATION",
  DELETE_EDUCATION = "DELETE_EDUCATION",
  CREATE_EXPERIENCE = "CREATE_EXPERIENCE",
  DELETE_EXPERIENCE = "DELETE_EXPERIENCE",
  GET_GITHUB = "GET_GITHUB",
}

export interface GetProfileAction {
  type: ProfilesTypes.GET_PROFILE;
  payload: ProfileDoc;
}

export interface CreateProfileAction {
  type: ProfilesTypes.CREATE_PROFILE;
  payload: ProfileDoc;
}
export interface DeleteProfileAction {
  type: ProfilesTypes.DELETE_PROFILE;
  payload: ProfileDoc;
}

export interface CreateEducAction {
  type: ProfilesTypes.CREATE_EDUCATION;
  payload: ProfileDoc;
}
export interface DeleteEducAction {
  type: ProfilesTypes.DELETE_EDUCATION;
  payload: ProfileDoc;
}
export interface CreatExpAction {
  type: ProfilesTypes.CREATE_EXPERIENCE;
  payload: ProfileDoc;
}
export interface DeleteExpAction {
  type: ProfilesTypes.DELETE_EXPERIENCE;
  payload: ProfileDoc;
}

export interface GithubAction {
  type: ProfilesTypes.GET_GITHUB;
  payload: ProfileDoc;
}

export type ProfileActions =
  | GetProfileAction
  | CreateProfileAction
  | DeleteProfileAction
  | CreateEducAction
  | DeleteEducAction
  | CreatExpAction
  | DeleteExpAction
  | GithubAction;
