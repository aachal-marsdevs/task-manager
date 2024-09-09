import React from "react";

const TaskFilter = ({ filter, setFilter, handleAddTask }) => {
  return (
    <div className="task-actions">
      <select
        className="filter-dropdown"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button className="btn-primary" onClick={handleAddTask}>
        Add New Task
      </button>
    </div>
  );
};

export default TaskFilter;
