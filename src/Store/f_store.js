import { createStore } from "redux";


import FavoReducer from "./reducer";

import { composeWithDevTools } from "redux-devtools-extension";


const f_store = createStore(FavoReducer,composeWithDevTools())


export default  f_store;
