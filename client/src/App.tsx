import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import DevelopersPage from "./features/developers/views/developersPage/DevelopersPage";
import EditEducation from "./features/my-profile/views/editProfile/EditEducation";
import EditExperience from "./features/my-profile/views/editProfile/EditExperience";
import EditProfile from "./features/my-profile/views/editProfile/EditProfile";
import LandingPage from "./features/landing/LandingPage";
import Login from "./features/auth/views/login/Login";
import MainLayout from "./components/layouts/MainLayout";
import MyPosts from "./features/posts/views/myPosts/MyPosts";
import PostsPage from "./features/posts/views/postsPage/PostsPage";
import PrivateRoute from "./app/router/PrivateRoute";
import ProfilePage from "./features/my-profile/views/profilePage/ProfilePage";
import React from "react";
import Register from "./features/auth/views/register/Register";
import { RootState } from "./store/configureStore/store";
import { Route } from "react-router";
import { Routes } from "./app/consts/RoutersConsts";
import SinglePost from "./features/posts/views/postsPage/SinglePost";
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
      <Route exact path={Routes.Home} component={LandingPage} />
      <Switch>
        <Route exact path={Routes.Register} component={Register} />
        <Route exact path={Routes.Login} component={Login} />
      </Switch>
      <Route
        exact
        path={[
          Routes.Developers,
          Routes.Posts,
          Routes.MyProfile,
          Routes.EditMyProfile,
          Routes.MyPosts,
          `${Routes.Post}/:id`,
        ]}
      >
        <MainLayout>
          <Switch>
            <PrivateRoute
              exact
              path={Routes.Posts}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              exact
              path={Routes.MyProfile}
              component={ProfilePage}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              exact
              path={Routes.EditMyProfile}
              component={EditProfile}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              exact
              path={Routes.EditMyEduc}
              component={EditEducation}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              exact
              path={Routes.EditMyExp}
              component={EditExperience}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              exact
              path={Routes.Posts}
              component={PostsPage}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              exact
              path={Routes.Developers}
              component={DevelopersPage}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              exact
              path={Routes.MyPosts}
              component={MyPosts}
              isAuth={isAuth}
              redirectPath={Routes.Login}
            />
            <PrivateRoute
              exact
              path={`${Routes.Post}/:id`}
              component={SinglePost}
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
