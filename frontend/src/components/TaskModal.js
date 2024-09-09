import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const TaskModal = ({ isOpen, onClose, onSubmit, task }) => {
	const [title, setTitle] = useState(task ? task.title : "");
	const [description, setDescription] = useState(
		task ? task.description : ""
	);
	const [status, setStatus] = useState(task ? task.status : "pending");

	// Update form fields when task changes
	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description);
			setStatus(task.status);
		}
	}, [task]);

	if (!isOpen) return null;

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			id: task ? task.id : null,
			title,
			description,
			status, // Include status in the form submission
		});
		setDescription("");
		setTitle("");
		setStatus("pending");
		onClose();
	};

	return ReactDOM.createPortal(
		<div className="modal-overlay">
			<div className="modal">
				<h2>{task ? "Edit Task" : "Add Task"}</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Title</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Description</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>

					{/* Status dropdown */}
					<div className="form-group">
						<label>Status</label>
						<div className="status-dropdown">
							<select
								name="status"
								id="status"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="form-control"
							>
								<option value="pending">Pending</option>
								<option value="inprogress">In Progress</option>
								<option value="completed">Completed</option>
							</select>
						</div>
					</div>

					<div className="form-actions">
						<button
							type="submit"
							className="btn-primary"
						>
							{task ? "Update Task" : "Add Task"}
						</button>
						<button
							type="button"
							className="btn-secondary"
							onClick={onClose}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>,
		document.getElementById("modal-root") // Ensures that modal is rendered in the correct DOM node
	);
};

export default TaskModal;
