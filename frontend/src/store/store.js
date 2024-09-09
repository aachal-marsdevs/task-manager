import { createStore, applyMiddleware, combineReducers } from "redux";
import { taskReducer } from "../reducers/taskReducer";
import { thunk } from "redux-thunk"; // Use named import

const rootReducer = combineReducers({
	tasks: taskReducer,
});

const middleware = [thunk];

// Create store without Redux DevTools
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
