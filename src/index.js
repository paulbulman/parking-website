import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "@aws-amplify/core";
import "bootstrap/dist/css/bootstrap.min.css";

if (process.env.NODE_ENV === "production") {
  Amplify.configure({
    Auth: {
      region: "eu-west-2",
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    }
  });
}

ReactDOM.render(<App />, document.getElementById("root"));