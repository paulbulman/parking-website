import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/rootReducer";

let store;

const configureStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enchancers = composeEnhancers(applyMiddleware(thunk));

  store = createStore(rootReducer, initialState, enchancers);

  return store;
};

export const getStore = () => store;

export default configureStore;
