import React from "react";
import AccountNavigation from "./AccountNavigation";
import AccountRouter from "./AccountRouter";

export default () => (
  <>
    <h2>Account</h2>
    <h4>Change your account settings</h4>
    <hr />
    <div className="row">
      <div className="col-md-3">
        <AccountNavigation />
      </div>
      <div className="col-md-9">
        <AccountRouter />
      </div>
    </div>
  </>
);
