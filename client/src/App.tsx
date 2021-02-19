import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Login from "./features/auth/views/login/Login";
import MainLayout from "./components/layouts/MainLayout";
import React from "react";
import Register from "./features/auth/views/register/Register";
import { Route } from "react-router";
import { TopBarLoader } from "./components/common/loaders/TopBarLoader";

const App = () => {
  return (
    <>
      <TopBarLoader />
      {/* <MainLayout /> */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </>
  );
};

export default App;
