import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Task = ({ task, onEdit, onDelete, onStatusChange }) => {
	return (
		<div className="task-item">
			<div className="task-header">
				<h3>{task.title}</h3>
				<div className="task-actions">
					<FontAwesomeIcon
						icon={faEdit}
						onClick={() => onEdit(task)}
						className="action-icon"
					/>
					<FontAwesomeIcon
						icon={faTrash}
						onClick={() => onDelete(task.id)}
						className="action-icon"
					/>
				</div>
			</div>
			<p>{task.description}</p>
			<div className="task-footer">
				<select
					className="status-dropdown"
					value={task.status}
					onChange={(e) => onStatusChange(task.id, e.target.value)}
				>
					<option value="pending">Pending</option>
					<option value="inprogress">In Progress</option>
					<option value="completed">Completed</option>
				</select>
			</div>
		</div>
	);
};

export default Task;
