import { AsyncStateModel, LoaderType } from "../../../store/async/asyncModels";

import React from "react";
import { RootState } from "../../../store/configureStore/store";
import TopBarProgress from "react-topbar-progress-indicator";
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
  const { isLoading, loaderType } = useSelector<RootState, AsyncStateModel>(
    (state) => state.async
  );
  return (
    <div>
      {isLoading && loaderType === LoaderType.Bar && <TopBarProgress />}
    </div>
  );
};
