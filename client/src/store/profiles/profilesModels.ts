import { EducationModel } from "./../../features/my-profile/models/formSchema";
import { ProfileDoc } from "../../../../server/src/models/Profile";
import { ProfileModel } from "../../features/my-profile/models/formSchema";
import { UserDoc } from "../../../../server/src/models/User";

// export interface UserProfileModel {
//     user: {
//         avatar: string;
//         name: string;
//         _id: string;
//     }
// }

export interface ProfileRespModel extends Omit<ProfileDoc, "user"> {
  user: {
    avatar: string;
    name: string;
    _id: string;
  };
  education: EducationModel[];
}

export interface ProfilesStateModel {
  profile?: ProfileRespModel;
  profiles?: ProfileRespModel[];
  repos?: [];
  user?: UserDoc;
}

export enum ProfilesTypes {
  GET_PROFILE = "GET_PROFILE",
  CREATE_PROFILE = "CREATE_PROFILE",
  CREATE_EDUCATION = "CREATE_EDUCATION",
  DELETE_EDUCATION = "DELETE_EDUCATION",
}

export interface GetProfileAction {
  type: ProfilesTypes.GET_PROFILE;
  payload: ProfileDoc;
}

export interface CreateProfileAction {
  type: ProfilesTypes.CREATE_PROFILE;
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

export type ProfileActions =
  | GetProfileAction
  | CreateProfileAction
  | CreateEducAction
  | DeleteEducAction;
