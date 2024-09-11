import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasksWithStatus } from "../actions/taskActions";

const TaskColumn = ({ status, handleEditTask, handleStatusChange }) => {
	const [page, setPage] = React.useState(1);
	const dispatch = useDispatch();
	const { tasks, hasMore } = useSelector((state) => {
		console.log("State", state);
		const t = state.tasks.tasks;

		if (status.id === "pending") {
			return {
				tasks: t.filter((task) => task.status === "pending"),
				hasMore: state.tasks.hasMore,
			};
		} else if (status.id === "inprogress") {
			return {
				tasks: t.filter((task) => task.status === "inprogress"),
				hasMore: state.tasks.hasMore,
			};
		} else if (status.id === "completed") {
			return {
				tasks: t.filter((task) => task.status === "completed"),
				hasMore: state.tasks.hasMore,
			};
		} else {
			return { tasks: t, hasMore: state.tasks.hasMore };
		}
	});

	const handleScroll = (e) => {
		if (
			e.target.scrollTop + window.innerHeight >= e.target.scrollHeight &&
			hasMore
		) {
			dispatch(fetchTasksWithStatus(status.id, page + 1));
			setPage((prev) => prev + 1);
		}
	};

	if (!tasks) return null;
	return (
		<Droppable droppableId={status.id}>
			{(provided, snapshot) => (
				<div
					className={`task-column ${
						snapshot.isDraggingOver ? "dragging-over" : ""
					}`}
					ref={provided.innerRef}
					{...provided.droppableProps}
					onScroll={handleScroll}
				>
					<h2 data-testid={`column-title-${status.id}`}>
						{status.title}
					</h2>
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
									className={
										snapshot.isDragging ? "dragging" : ""
									}
									data-testid={`draggable-task-${task.id}`}
								>
									<Task
										task={task}
										onEdit={handleEditTask}
										onStatusChange={handleStatusChange}
									/>
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
