import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Task = ({ task, onEdit, onStatusChange }) => {
  return (
    <div className="task-item">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-actions">
          <FontAwesomeIcon
            icon={faEdit}
            onClick={() => onEdit(task)}
            className="action-icon"
            data-testid={`edit-button-${task.id}`} // Added data-testid here
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
