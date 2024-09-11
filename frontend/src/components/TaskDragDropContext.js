import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";

const TaskDragDropContext = ({
	tasks,
	handleEditTask,
	handleStatusChange,
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

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div
				className="task-columns"
				data-testid="task-columns"
			>
				{taskStatuses.map((status) => (
					<TaskColumn
						key={status.id}
						status={status}
						handleEditTask={handleEditTask}
						handleStatusChange={handleStatusChange}
					/>
				))}
			</div>
		</DragDropContext>
	);
};

export default TaskDragDropContext;
