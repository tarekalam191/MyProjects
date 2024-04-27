import { createStore } from "redux";

import WishReducer from "./reducer";

import { composeWithDevTools } from "redux-devtools-extension";

const w_store = createStore(WishReducer,composeWithDevTools())


export default w_store;

