import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";

let store;

const configureStore = initialState => {
  const enchancers = applyMiddleware(thunk);
  store = createStore(rootReducer, initialState, enchancers);
  return store;
};

export const getStore = () => store;

export default configureStore;
