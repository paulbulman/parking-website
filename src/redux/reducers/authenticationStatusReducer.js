import * as types from "../actions/actionTypes";
import * as authenticationStatus from "./authenticationStatus";
import initialState from "./initialState";

export default (state = initialState.authenticationStatus, action) => {
  switch (action.type) {
    case types.AUTHENTICATED:
      return authenticationStatus.AUTHENTICATED;
    case types.NOT_AUTHENTICATED:
      return authenticationStatus.NOT_AUTHENTICATED;
    default:
      return state;
  }
};
