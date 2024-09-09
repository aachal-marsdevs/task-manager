import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, addTask, updateTask } from "../actions/taskActions";
import TaskDragDropContext from "../components/TaskDragDropContext";
import TaskFilter from "../components/TaskFilter";
import TaskModal from "../components/TaskModal";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, error } = useSelector((state) => state.tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitTask = (task) => {
    if (task.id) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask(task));
    }
    setIsModalOpen(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, status: newStatus };
    dispatch(updateTask(updatedTask));
  };

  return (
    <div className="task-list-container">
      <h1>Task Management Board</h1>

      {error && <p className="error">{error}</p>}

      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        handleAddTask={handleAddTask}
      />

      <TaskDragDropContext
        tasks={tasks}
        filter={filter}
        handleEditTask={handleEditTask}
        handleStatusChange={handleStatusChange}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
};

export default TaskList;
