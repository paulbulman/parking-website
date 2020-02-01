import { combineReducers } from "redux";
import authenticationStatusReducer from "./authenticationStatusReducer";

export const createRootReducer = authenticationStatus =>
  combineReducers({ authenticationStatus });

export default createRootReducer(authenticationStatusReducer);
