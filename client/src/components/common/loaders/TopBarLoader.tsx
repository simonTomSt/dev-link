import { LoaderType } from "../../../store/async/asyncModels";
import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { asyncStore } from "../../../store/async/asyncReducer";
import { useSelector } from "react-redux";

TopBarProgress.config({
  barColors: {
    "0": "blue",
    "1.0": "darkblue",
  },
  shadowBlur: 5,
  barThickness: 4,
});

export const TopBarLoader = () => {
  const { isLoading, loaderType } = useSelector(asyncStore);
  return (
    <div>
      {isLoading && loaderType === LoaderType.Bar && <TopBarProgress />}
    </div>
  );
};
