import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";

const TaskDragDropContext = ({
  tasks,
  filter,
  handleEditTask,
  handleStatusChange,
  lastTaskElementRef,
}) => {
  const taskStatuses = [
    { id: "pending", title: "Pending" },
    { id: "inprogress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ];

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((task) => String(task.id) === draggableId);
    const updatedTask = { ...task, status: destination.droppableId };

    handleStatusChange(task.id, updatedTask.status);
  };

  const getFilteredTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .filter((task) => {
        if (filter === "all") return true;
        return task.status === filter;
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-columns" data-testid="task-columns">
        {taskStatuses.map((status) => (
          <TaskColumn
            key={status.id}
            status={status}
            tasks={getFilteredTasks(status.id)}
            handleEditTask={handleEditTask}
            lastTaskElementRef={lastTaskElementRef}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskDragDropContext;
