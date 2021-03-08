import {
  AlertTypes,
  AsyncStateModel,
  LoaderType,
} from "../../../store/async/asyncModels";
import React, { useCallback, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store/configureStore/store";
import { Spinner } from "react-bootstrap";
import { clearError } from "../../../store/async/asyncActions";

export interface AsyncWrapperProps {
  errorMessage?: string;
  loader?: React.ReactNode;
  children?: React.ReactNode;
  autoClose?: number | false;
}

export default function AsyncWrapper({
  children,
  errorMessage,
  loader,
  autoClose = 5000,
}: AsyncWrapperProps) {
  const { isLoading, loaderType, isAlert, alertType, alertMsg } = useSelector<
    RootState,
    AsyncStateModel
  >((state) => state.async);

  const dispatch = useDispatch();
  const setErrorMsg = useCallback(() => {
    if (errorMessage) return errorMessage;
    else if (alertMsg) return alertMsg;
    return "Ops, there is an error";
  }, [alertMsg, errorMessage]);

  useEffect(() => {
    isAlert && alertType === AlertTypes.Error && toast.error(setErrorMsg());
  }, [isAlert, alertType, setErrorMsg]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  if (loader) {
    return (
      <>{isLoading && loaderType === LoaderType.Spinner ? loader : children}</>
    );
  } else {
    return (
      <>
        {isLoading && loaderType === LoaderType.Spinner ? (
          <div className="centralized">
            <Spinner animation="border" variant={"warning"} />
          </div>
        ) : (
          children && children
        )}
        <ToastContainer autoClose={autoClose} className="mt-5" />
      </>
    );
  }
}
