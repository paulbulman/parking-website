import * as action from "./../actions/authenticationActions";
import { getStore } from "./../config/configureStore";

export const markAsAuthenticated = () => {
  action.markAsAuthenticated()(getStore().dispatch);
};

export const markAsNotAuthenticated = () => {
  action.markAsNotAuthenticated()(getStore().dispatch);
};
