import { createStore, applyMiddleware, combineReducers } from "redux";
import { taskReducer } from "../reducers/taskReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
	tasks: taskReducer,
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
