import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const TaskColumn = ({ status, tasks, handleEditTask, lastTaskElementRef }) => {
  return (
    <div className="task-column">
      <h2>{status.title}</h2>
      <Droppable droppableId={status.id}>
        {(provided) => (
          <div
            className="task-column-content"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => {
              if (tasks.length === index + 1) {
                return (
                  <div ref={lastTaskElementRef} key={task.id}>
                    <Task
                      task={task}
                      index={index}
                      handleEditTask={handleEditTask}
                    />
                  </div>
                );
              }
              return (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  handleEditTask={handleEditTask}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
