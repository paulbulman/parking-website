import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";

const configureStore = initialState => {
  const enchancers = applyMiddleware(thunk);
  return createStore(rootReducer, initialState, enchancers);
};

export default configureStore;
