import { toast } from "react-toastify";
import axios from "axios";
import {
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAIL,
  ADD_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_REVERT,
} from "../constants/taskConstants";

export const fetchTasks = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/tasks");
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_TASKS_FAIL, payload: error.message });
    toast.error("Failed to fetch tasks. Please try again.");
  }
};

export const addTask = (task) => async () => {
  try {
    await axios.post("/tasks", task);
  } catch (error) {
    toast.error("Failed to add task. Please try again.");
  }
};

export const addTaskFromSocket = (task) => (dispatch) => {
  dispatch({ type: ADD_TASK_SUCCESS, payload: task });
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/tasks/${task.id}`, task);
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data,
    });
    toast.success("Task updated successfully.");
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_REVERT,
      payload: task,
    });
    toast.error("Failed to update task.");
  }
};

export const updateTaskStatusFromSocket = (updatedTask) => (dispatch) => {
  dispatch({
    type: UPDATE_TASK_SUCCESS,
    payload: updatedTask,
  });
};
