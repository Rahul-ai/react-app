import { Store } from "redux";
import { reducer } from "../Reducer/Reducer";

const redux = require('redux');
const createStore = redux.createStore;
export const store:Store = createStore(reducer);