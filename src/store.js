import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promiseMiddleWare from "redux-promise-middleware";
import superReducer from "./reducers";
import logger from "redux-logger";

export const store = createStore(
  superReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(promiseMiddleWare(), thunk, logger)
);
