import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./redux/config/configureStore";
import initialState from "./redux/reducers/initialState";
import { configure as configureAuthentication } from "./services/authenticationService";

import "bootstrap/dist/css/bootstrap.min.css";

configureAuthentication();

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
