import {
  ProfileActions as Actions,
  ProfilesTypes,
  ProfilesStateModel as StateModel,
} from "./profilesModels";

const initialState: StateModel = {
  profile: undefined,
  profiles: [],
  repos: [],
};

export const profilesReducer = (
  state = initialState,
  { type, payload }: Actions
) => {
  switch (type) {
    case ProfilesTypes.GET_PROFILE: {
      return {
        ...state,
        profile: payload,
      };
    }
    case ProfilesTypes.CREATE_PROFILE: {
      return {
        ...state,
        profile: payload,
      };
    }
    case ProfilesTypes.DELETE_PROFILE: {
      return {
        ...state,
        profile: null,
      };
    }
    case ProfilesTypes.CREATE_EDUCATION: {
      return {
        ...state,
        profile: payload,
      };
    }
    case ProfilesTypes.DELETE_EDUCATION: {
      return {
        ...state,
        profile: payload,
      };
    }
    case ProfilesTypes.CREATE_EXPERIENCE: {
      return {
        ...state,
        profile: payload,
      };
    }
    case ProfilesTypes.DELETE_EXPERIENCE: {
      return {
        ...state,
        profile: payload,
      };
    }
    case ProfilesTypes.GET_GITHUB: {
      return {
        ...state,
        repos: payload,
      };
    }
    default:
      return state;
  }
};
