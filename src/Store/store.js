import { createStore } from "redux";
import { CartReducer } from './reducer';

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(CartReducer,composeWithDevTools())

export default store;

