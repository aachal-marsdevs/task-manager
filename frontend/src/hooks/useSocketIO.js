import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
	addTaskFromSocket,
	updateTaskStatusFromSocket,
} from "../actions/taskActions";

const SOCKET_SERVER_URL = "http://localhost:5000";

const useSocketIO = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const socket = io(SOCKET_SERVER_URL, {
			transports: ["websocket"],
			reconnectionAttempts: 5,
			reconnectionDelay: 2000,
		});

		socket.on("taskAdded", (newTask) => {
			dispatch(addTaskFromSocket(newTask));
		});

		socket.on("taskUpdated", (updatedTask) => {
			dispatch(updateTaskStatusFromSocket(updatedTask));
		});

		socket.on("connect_error", () => {
			console.error(
				"Connection to server failed. Trying to reconnect..."
			);
		});

		socket.on("disconnect", () => {
			console.error(
				"Disconnected from server. Attempting to reconnect..."
			);
			socket.connect();
		});

		return () => {
			socket.disconnect(); 
		};
	}, [dispatch]); 

	return null; 
};

export default useSocketIO;
