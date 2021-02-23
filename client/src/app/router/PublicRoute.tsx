import { Redirect, Route, RouteProps } from "react-router-dom";

import React from "react";

export interface IPublicRouteProps extends RouteProps {
  isAuth: boolean | null;
  redirectPath?: string;
  restricted?: boolean;
}

const PublicRoute: React.FC<IPublicRouteProps> = (props) => {
  return props.isAuth && props.restricted ? (
    <>
      <Redirect to={{ pathname: props.redirectPath }} />
    </>
  ) : (
    <>
      <Route {...props} component={props.component} render={undefined} exact />
    </>
  );
};

export default PublicRoute;
