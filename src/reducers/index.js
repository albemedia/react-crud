import { combineReducers } from "redux";

import customersReducer from "./customersReducer";
import productsReducer from "./productsReducer";

const superReducer = combineReducers({
  customers: customersReducer,
  products: productsReducer
});

export default superReducer;
