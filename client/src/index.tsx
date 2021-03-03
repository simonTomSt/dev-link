import * as serviceWorker from "./serviceWorker";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StorageNames } from "./app/consts/StorageConsts";
import { initAuth } from "./store/auth/authActions";
import { storageGet } from "./app/helpers/localStorage";
import { store } from "./store/configureStore/store";

const token = storageGet(StorageNames.Token);
store.dispatch<any>(initAuth(token));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
