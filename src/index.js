import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import configureStore from "./redux/config/configureStore";
import initialState from "./redux/reducers/initialState";
import { configure as configureAuthentication } from "./services/authenticationService";

import "bootstrap/dist/css/bootstrap.min.css";

configureAuthentication();

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
