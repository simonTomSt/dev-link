import {LoaderType, asyncTypes} from "../async/asyncModels";
import {AuthPayloadModel as PayloadModel, authTypes} from "./authModels";

import {AlertTypes} from "../async/asyncModels";
import {Dispatch} from "redux";
import axios from "axios";
import {setError, setSpinnerLoading, stopLoading} from "../async/asyncActions";
import {axiosConfig} from "../../app/config/axiosConfig";

export const registerUser = ({name, email, password}: PayloadModel) => async (
    dispatch: Dispatch
) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({name, email, password});

    try {
        dispatch({
            type: asyncTypes.SET_LOADING,
            payload: {loaderType: LoaderType.Spinner},
        });

        const res = await axios.post("/api/users", body, config);

        dispatch({
            type: authTypes.AUTH_USER,
            payload: res.data,
        });
        dispatch({
            type: asyncTypes.STOP_LOADING,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: asyncTypes.SET_ALERT,
            payload: {alertMsg: "Failed to register", alertType: AlertTypes.Error},
        });
    }
};

export const logInUser = ({email, password}: PayloadModel) => async (
    dispatch: Dispatch
) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({email, password});

    try {
        dispatch({
            type: asyncTypes.SET_LOADING,
            payload: {loaderType: LoaderType.Spinner},
        });

        const res = await axios.post("/api/auth/login", body, config);

        dispatch({
            type: authTypes.AUTH_USER,
            payload: res.data,
        });
        dispatch({
            type: asyncTypes.STOP_LOADING,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: asyncTypes.SET_ALERT,
            payload: {alertMsg: "Failed to login", alertType: AlertTypes.Error},
        });
    }
};

export function logOutUser() {
    return {
        type: authTypes.LOG_OUT_USER,
    };
}

export function initAuth(payload: PayloadModel) {
    return {type: authTypes.AUTH_INIT, payload};
}


export const getMe = () => async (dispatch: Dispatch) => {

    try {
        dispatch(setSpinnerLoading())
        const res = await axios.get("/api/auth", axiosConfig);
        dispatch({type: authTypes.GET_ME, payload: res.data})
        dispatch(stopLoading())
        return {type: authTypes.AUTH_INIT, payload: res.data};
    } catch (error) {

        dispatch(setError("Failed to load user data"))
    }
}

