import {
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAIL,
	ADD_TASK_SUCCESS,
	ADD_TASK_FAIL,
	UPDATE_TASK_SUCCESS,
	UPDATE_TASK_FAIL,
	DELETE_TASK_SUCCESS,
	DELETE_TASK_FAIL,
} from "../constants/taskConstants";

const initialState = {
	tasks: [],
	error: null,
};

export const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_TASKS_SUCCESS:
			return { ...state, tasks: action.payload };
		case FETCH_TASKS_FAIL:
			return { ...state, error: action.payload };
		case ADD_TASK_SUCCESS:
			return { ...state, tasks: [...state.tasks, action.payload] };
		case ADD_TASK_FAIL:
			return { ...state, error: action.payload };
		case UPDATE_TASK_SUCCESS:
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === action.payload.id ? action.payload : task
				),
			};
		case UPDATE_TASK_FAIL:
			return { ...state, error: action.payload };
		case DELETE_TASK_SUCCESS:
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		case DELETE_TASK_FAIL:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};
