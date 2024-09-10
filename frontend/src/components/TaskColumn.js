import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

const TaskColumn = ({ status, tasks, handleEditTask }) => {
  return (
    <Droppable droppableId={status.id}>
      {(provided, snapshot) => (
        <div
          className={`task-column ${
            snapshot.isDraggingOver ? "dragging-over" : ""
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 data-testid={`column-title-${status.id}`}>{status.title}</h2>
          {tasks.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={String(task.id)}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={snapshot.isDragging ? "dragging" : ""}
                  data-testid={`draggable-task-${task.id}`}
                >
                  <Task task={task} onEdit={handleEditTask} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;
