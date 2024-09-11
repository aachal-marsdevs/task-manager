import {
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAIL,
	ADD_TASK_SUCCESS,
	ADD_TASK_FAIL,
	UPDATE_TASK_SUCCESS,
	UPDATE_TASK_FAIL,
	FETCH_TASK_FOR_FILTER_SUCCESS,
} from "../constants/taskConstants";

const initialState = {
	tasks: [],
	error: null,
	hasMore: false,
};

export const taskReducer = (state = initialState, action) => {
	console.log("Payload", action.payload);
	switch (action.type) {
		case FETCH_TASKS_SUCCESS:
			return {
				...state,
				tasks: [...state.tasks, ...action.payload.tasks],
				hasMore: action.payload.hasMore,
				error: null,
			};
		case FETCH_TASK_FOR_FILTER_SUCCESS:
			return {
				...state,
				tasks: action.payload.tasks,
				error: null,
				hasMore: action.payload.hasMore,
			};
		case FETCH_TASKS_FAIL:
			return { ...state, error: action.payload.error };
		case ADD_TASK_SUCCESS:
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};
		case ADD_TASK_FAIL:
			return { ...state, error: action.payload.error };
		case UPDATE_TASK_SUCCESS:
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id ? action.payload : task
				),
			};
		case UPDATE_TASK_FAIL:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
