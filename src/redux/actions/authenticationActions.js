import * as actionTypes from "./actionTypes";

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
