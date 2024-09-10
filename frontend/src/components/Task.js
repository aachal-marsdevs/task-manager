import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, onEdit, onStatusChange }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          className="task-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="task-header">
            <h3>{task.title}</h3>
            <div className="task-actions">
              <FontAwesomeIcon
                icon={faEdit}
                onClick={() => onEdit(task)}
                className="action-icon"
                data-testid={`edit-button-${task.id}`}
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
      )}
    </Draggable>
  );
};

export default Task;
