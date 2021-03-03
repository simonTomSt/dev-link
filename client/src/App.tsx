import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import EditEducation from "./features/my-profile/views/editProfile/EditEducation";
import EditProfile from "./features/my-profile/views/editProfile/EditProfile";
import Login from "./features/auth/views/login/Login";
import MainLayout from "./components/layouts/MainLayout";
import PrivateRoute from "./app/router/PrivateRoute";
import ProfilePage from "./features/my-profile/views/profilePage/ProfilePage";
import PublicRoute from "./app/router/PublicRoute";
import React from "react";
import Register from "./features/auth/views/register/Register";
import { RootState } from "./store/configureStore/store";
import { Route } from "react-router";
import { Routes } from "./app/consts/RoutersConsts";
import Switch from "react-bootstrap/esm/Switch";
import { TopBarLoader } from "./components/common/loaders/TopBarLoader";
import { authStateModel } from "./store/auth/authModels";
import { useSelector } from "react-redux";

const App = () => {
  const { isAuth } = useSelector<RootState, authStateModel>(
    (state) => state.auth
  );

  return (
    <Switch>
      <TopBarLoader />
      <Route exact path={Routes.Home} />
      <Switch>
        <PublicRoute
          path={Routes.Register}
          component={Register}
          isAuth={isAuth}
          redirectPath={Routes.Posts}
          // restricted={true}
        />
        <PublicRoute
          path={Routes.Login}
          component={Login}
          isAuth={isAuth}
          redirectPath={Routes.Posts}
          // restricted={true}
        />
      </Switch>
      <Route path={[Routes.Posts, Routes.MyProfile, Routes.EditMyProfile]}>
        <MainLayout>
          <Switch>
            <PrivateRoute
              path={Routes.Posts}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              path={Routes.MyProfile}
              component={ProfilePage}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              path={Routes.EditMyProfile}
              component={EditProfile}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              path={Routes.EditMyEduc}
              component={EditEducation}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
          </Switch>
        </MainLayout>
      </Route>
    </Switch>
  );
};

export default App;
