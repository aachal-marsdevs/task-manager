import { toast } from "react-toastify";
import axios from "axios";
import {
	FETCH_TASKS_SUCCESS,
	FETCH_TASKS_FAIL,
	ADD_TASK_SUCCESS,
	UPDATE_TASK_SUCCESS,
	DELETE_TASK_FAIL,
	DELETE_TASK_SUCCESS,
	UPDATE_TASK_REVERT,
} from "../constants/taskConstants";

// Fetch tasks
export const fetchTasks = () => async (dispatch) => {
	try {
		const { data } = await axios.get("/tasks");
		dispatch({ type: FETCH_TASKS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({ type: FETCH_TASKS_FAIL, payload: error.message });
		toast.error("Failed to fetch tasks. Please try again.");
	}
};

// Add task API call
export const addTask = (task) => async () => {
	try {
		// Make the API call to add the task, but don't update state locally
		await axios.post("/tasks", task);
		// The task will be added via the socket event, no need to dispatch ADD_TASK_SUCCESS here
	} catch (error) {
		toast.error("Failed to add task. Please try again.");
	}
};

// Add task from Socket.IO (Socket event handler)
export const addTaskFromSocket = (task) => (dispatch) => {
	dispatch({ type: ADD_TASK_SUCCESS, payload: task });
};

// Update task via API or form
export const updateTask = (task) => async (dispatch) => {
	try {
		const { data } = await axios.put(`/tasks/${task.id}`, task);
		dispatch({
			type: UPDATE_TASK_SUCCESS,
			payload: data, // Updated task data returned from API
		});
		toast.success("Task updated successfully.");
	} catch (error) {
		dispatch({
			type: UPDATE_TASK_REVERT,
			payload: task, // Revert to the original task if update fails
		});
		toast.error("Failed to update task.");
	}
};

// Update task status from Socket.IO (Socket event handler)
export const updateTaskStatusFromSocket = (updatedTask) => (dispatch) => {
	dispatch({
		type: UPDATE_TASK_SUCCESS,
		payload: updatedTask, // Update task directly from the socket event
	});
};

// Delete task
export const deleteTask = (taskId) => async (dispatch) => {
	try {
		await axios.delete(`/tasks/${taskId}`);
		dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
	} catch (error) {
		dispatch({ type: DELETE_TASK_FAIL, payload: error.message });
		toast.error("Failed to delete task. Please try again.");
	}
};
