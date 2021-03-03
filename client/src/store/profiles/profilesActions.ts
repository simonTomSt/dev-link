import { AlertTypes, asyncTypes } from "../async/asyncModels";
import {
  EducSchemaModel,
  ProfileModel,
} from "../../features/my-profile/models/formSchema";
import { ProfilesStateModel, ProfilesTypes } from "./profilesModels";
import {
  setBarLoading,
  setError,
  setSpinnerLoading,
  stopLoading,
} from "../async/asyncActions";

import { Dispatch } from "redux";
import axios from "axios";
import { axiosConfig } from "./../../app/config/axiosConfig";

export const getUserProfile = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/profiles/user",
      axiosConfig
    );
    dispatch({
      type: ProfilesTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: asyncTypes.SET_ALERT,
      payload: {
        alertMsg: "Failed to load profile",
        alertType: AlertTypes.Error,
      },
    });
  }
};

export const createUserProfile = (payload: ProfileModel) => async (
  dispatch: Dispatch
) => {
  const body = JSON.stringify(payload);
  try {
    dispatch(setSpinnerLoading());
    const res = await axios.post(
      "http://localhost:5000/api/profiles/create",
      body,
      axiosConfig
    );
    dispatch({
      type: ProfilesTypes.GET_PROFILE,
      payload: res.data,
    });
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setError("Failed to load profile"));
  }
};

export const addEducation = (payload: EducSchemaModel) => async (
  dispatch: Dispatch
) => {
  const body = JSON.stringify(payload);

  try {
    dispatch(setSpinnerLoading());
    await axios.put(
      "http://localhost:5000/api/profiles/education",
      body,
      axiosConfig
    );
    dispatch(stopLoading());
  } catch (error) {
    console.log(error);
    dispatch(setError("Failed to edit education"));
  }
};

export const deleteEducation = (payload: string) => async (
  dispatch: Dispatch
) => {
  dispatch(setSpinnerLoading());
  await axios.delete(
    `http://localhost:5000/api/profiles/education/${payload}`,
    axiosConfig
  );
  dispatch(stopLoading());
};
