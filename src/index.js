import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configure as configureAuthentication } from "./services/authenticationService";

import "bootstrap/dist/css/bootstrap.min.css";

configureAuthentication();

ReactDOM.render(<App />, document.getElementById("root"));
