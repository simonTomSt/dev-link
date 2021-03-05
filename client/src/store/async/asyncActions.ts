import {AlertTypes, AsyncPayload, asyncTypes, LoaderType} from "./asyncModels";
import {Dispatch} from "redux";
import {Action} from "react-toastify/dist/hooks/toastContainerReducer";

export const setAlert = ({alertMsg, alertType}: AsyncPayload) => {
    return {
        type: asyncTypes.SET_ALERT,
        payload: {alertMsg, alertType},
    }
}

export const setError = (message: string) => {
    return {
        type: asyncTypes.SET_ALERT,
        payload: {alertMsg: message, alertType: AlertTypes.Error},
    }
}
export const setBarLoading = () => {
    return {
        type: asyncTypes.SET_LOADING,
        payload: {loaderType: LoaderType.Bar}
    }
}
export const setSpinnerLoading = () => {
    return {
        type: asyncTypes.SET_LOADING,
        payload: {loaderType: LoaderType.Spinner},
    }
}

export const stopLoading = () => {
    return {
        type: asyncTypes.STOP_LOADING,
    }
}