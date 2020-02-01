import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/rootReducer";

const configureStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enchancers = composeEnhancers(applyMiddleware(thunk));

  return createStore(rootReducer, initialState, enchancers);
};

export default configureStore;
