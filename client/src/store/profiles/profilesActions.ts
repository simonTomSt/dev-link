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
  dispatch(setSpinnerLoading());
  try {
    const res = await axios.get(
      "http://localhost:5000/api/profiles/user",
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
    const res = await axios.put(
      "http://localhost:5000/api/profiles/education",
      body,
      axiosConfig
    );
    dispatch({
      type: ProfilesTypes.CREATE_EDUCATION,
      payload: res.data,
    });
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
  const res = await axios.delete(
    `http://localhost:5000/api/profiles/education/${payload}`,
    axiosConfig
  );
  dispatch({
    type: ProfilesTypes.DELETE_EDUCATION,
    payload: res.data,
  });
  dispatch(stopLoading());
};

export const addExperience = (payload: any) => async (dispatch: Dispatch) => {
  const body = JSON.stringify(payload);
  dispatch(setSpinnerLoading());
  try {
    const res = await axios.put("/api/profiles/experience", body, axiosConfig);
    dispatch({
      type: ProfilesTypes.CREATE_EXPERIENCE,
      payload: res.data,
    });
    dispatch(stopLoading());
  } catch (error) {
    dispatch(setError("Failed to edit experience"));
  }
};

export const deleteExperience = (payload: string) => async (
  dispatch: Dispatch
) => {
  dispatch(setSpinnerLoading());
  const res = await axios.delete(
    `/api/profiles/experience/${payload}`,
    axiosConfig
  );
  dispatch({
    type: ProfilesTypes.DELETE_EXPERIENCE,
    payload: res.data,
  });
  dispatch(stopLoading());
};
