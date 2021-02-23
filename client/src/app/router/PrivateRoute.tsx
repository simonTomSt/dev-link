import { Redirect, Route, RouteProps } from "react-router";

import React from "react";

export interface IPrivateRouteProps extends RouteProps {
  isAuth: boolean | null;
  redirectPath: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = (props) => {
  return props.isAuth ? (
    <Route {...props} component={props.component} exact />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

export default PrivateRoute;
