import React from "react";
import TaskList from "./pages/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSocketIO from "./hooks/useSocketIO";

function App() {
	useSocketIO();

	return (
		<div className="App">
			<TaskList />
			<ToastContainer />
		</div>
	);
}

export default App;
