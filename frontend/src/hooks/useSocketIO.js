import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
	addTaskFromSocket,
	updateTaskStatusFromSocket,
} from "../actions/taskActions";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Your backend server

const useSocketIO = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const socket = io(SOCKET_SERVER_URL, {
			transports: ["websocket"],
			reconnectionAttempts: 5,
			reconnectionDelay: 2000,
		});

		// Listen for real-time events
		socket.on("taskAdded", (newTask) => {
			dispatch(addTaskFromSocket(newTask));
		});

		socket.on("taskUpdated", (updatedTask) => {
			dispatch(updateTaskStatusFromSocket(updatedTask));
		});

		// Handle connection errors
		socket.on("connect_error", () => {
			console.error(
				"Connection to server failed. Trying to reconnect..."
			);
		});

		socket.on("disconnect", () => {
			console.error(
				"Disconnected from server. Attempting to reconnect..."
			);
			socket.connect(); // Try to reconnect automatically
		});

		// Cleanup function to avoid re-establishing socket connections on component re-renders
		return () => {
			socket.disconnect(); // Disconnect when the component unmounts
		};
	}, [dispatch]); // Empty dependency array ensures this effect runs only once

	return null; // This hook does not render anything
};

export default useSocketIO;
