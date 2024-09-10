import { toast } from "react-toastify";
import axios from "axios";
import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  FETCH_TASKS_END,
  FETCH_TASKS_REQUEST,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_REVERT,
} from "../constants/taskConstants";

export const fetchTasks =
  (page = 1) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_TASKS_REQUEST });

      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const limit = 3;
      const offset = (page - 1) * limit;

      if (storedTasks.length >= offset + limit && page === 1) {
        const paginatedTasks = storedTasks.slice(offset, offset + limit);
        dispatch({ type: FETCH_TASKS_SUCCESS, payload: paginatedTasks });
      } else {
        const { data } = await axios.get(`/tasks?page=${page}&limit=${limit}`);

        if (data.tasks.length === 0) {
          dispatch({ type: FETCH_TASKS_END });
        } else {
          const updatedTasks = [...storedTasks, ...data.tasks];
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));

          dispatch({
            type: FETCH_TASKS_SUCCESS,
            payload: data.tasks,
          });
        }
      }
    } catch (error) {
      dispatch({ type: FETCH_TASKS_FAIL, payload: error.message });
      toast.error("Failed to fetch tasks. Please try again.");
    }
  };

export const addTask = (task) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/tasks", task);

    const updatedTasks = [...getState().tasks.tasks, data];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  } catch (error) {
    toast.error("Failed to add task. Please try again.");
  }
};

export const addTaskFromSocket = (task) => (dispatch) => {
  dispatch({ type: ADD_TASK_SUCCESS, payload: task });
};

export const updateTask = (task) => async (dispatch, getState) => {
  try {
    const { data } = await axios.put(`/tasks/${task.id}`, task);

    const updatedTasks = getState().tasks.tasks.map((t) =>
      t.id === task.id ? data : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data,
    });
    toast.success("Task updated successfully.");
  } catch (error) {
    toast.error("Failed to update task. Please try again.");
  }
};

export const updateTaskStatusFromSocket = (updatedTask) => (dispatch) => {
  dispatch({
    type: UPDATE_TASK_SUCCESS,
    payload: updatedTask,
  });
};
