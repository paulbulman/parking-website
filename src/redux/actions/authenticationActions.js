import * as actionTypes from "./actionTypes";
import { isAuthenticated } from "./../../services/authenticationService";

export const createActionAuthenticated = () => {
  return { type: actionTypes.AUTHENTICATED };
};

export const createActionNotAuthenticated = () => {
  return { type: actionTypes.NOT_AUTHENTICATED };
};

export const markAsAuthenticated = () => dispatch => {
  dispatch(createActionAuthenticated());
};

export const markAsNotAuthenticated = () => dispatch => {
  dispatch(createActionNotAuthenticated());
};

export const createRefreshAuthenticationStatus = isAuthenticated => () => async dispatch => {
  if (await isAuthenticated()) {
    dispatch(createActionAuthenticated());
  } else {
    dispatch(createActionNotAuthenticated());
  }
};

export const refreshAuthenticationStatus = createRefreshAuthenticationStatus(
  isAuthenticated
);
