import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "./features/auth/views/login/Login";
import MainLayout from "./components/layouts/MainLayout";
import PrivateRoute from "./app/router/PrivateRoute";
import PublicRoute from "./app/router/PublicRoute";
import Register from "./features/auth/views/register/Register";
import { RootState } from "./store/configureStore/store";
import { Route } from "react-router";
import { Routes } from "./app/consts/RoutersConsts";
import { StorageNames } from "./app/consts/StorageConsts";
import Switch from "react-bootstrap/esm/Switch";
import { TopBarLoader } from "./components/common/loaders/TopBarLoader";
import { authStateModel } from "./store/auth/authModels";
import { initAuth } from "./store/auth/authActions";
import { storageGet } from "./app/helpers/localStorage";

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector<RootState, authStateModel>(
    (state) => state.auth
  );

  useEffect(() => {
    const token = storageGet(StorageNames.Token);
    dispatch(initAuth(token));
  }, [dispatch]);

  return (
    <Switch>
      <TopBarLoader />
      <Route exact path={Routes.Home} />
      <PublicRoute
        path={Routes.Register}
        component={Register}
        isAuth={isAuth}
        redirectPath={Routes.Posts}
        restricted={true}
      />
      <PublicRoute
        path={Routes.Login}
        component={Login}
        isAuth={isAuth}
        redirectPath={Routes.Posts}
        restricted={true}
      />
      <Route exact path={[Routes.Posts]}>
        <MainLayout>
          <Switch>
            <PrivateRoute
              path={Routes.Posts}
              isAuth={isAuth}
              redirectPath={Routes.Login}
              exact
            />
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
};

export default App;
