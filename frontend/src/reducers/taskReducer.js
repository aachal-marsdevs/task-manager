import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  FETCH_TASKS_END,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_REVERT,
  FETCH_TASKS_REQUEST,
} from "../constants/taskConstants";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  hasMore: true,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, ...action.payload],
        loading: false,
        error: null,
      };
    case FETCH_TASKS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TASKS_END:
      return {
        ...state,
        hasMore: false,
        loading: false,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    default:
      return state;
  }
};
