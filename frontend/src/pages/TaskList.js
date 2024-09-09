import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchTasks,
	addTask,
	updateTask,
	deleteTask,
} from "../actions/taskActions";
import Task from "../components/Task";
import TaskModal from "../components/TaskModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = () => {
	const dispatch = useDispatch();

	// Get tasks and error from Redux store
	const { tasks, error } = useSelector((state) => state.tasks);

	// State for modal visibility, editing task, and filter
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTask, setEditingTask] = useState(null);
	const [filter, setFilter] = useState("all"); // New filter state

	// Fetch tasks when the component mounts
	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	// Open the modal for adding a new task
	const handleAddTask = () => {
		setEditingTask(null); // No task to edit, so we create a new one
		setIsModalOpen(true);
	};

	// Open the modal for editing an existing task
	const handleEditTask = (task) => {
		setEditingTask(task); // Set the task to edit
		setIsModalOpen(true);
	};

	// Handle modal form submission (add or edit task)
	const handleSubmitTask = (task) => {
		if (task.id) {
			// Dispatch an action to update an existing task with all fields
			dispatch(updateTask(task));
		} else {
			// Dispatch an action to add a new task
			dispatch(addTask(task));
		}
		setIsModalOpen(false);
	};

	// Handle task deletion
	const handleDeleteTask = (taskId) => {
		dispatch(deleteTask(taskId)); // Dispatch an action to delete the task
	};

	// Handle status change for tasks
	const handleStatusChange = (taskId, newStatus) => {
		const task = tasks.find((task) => task.id === taskId);
		const updatedTask = { ...task, status: newStatus };

		// Dispatch action to update the task on the server
		dispatch(updateTask(updatedTask)); // Use updateTask here to trigger server update and socket emission
	};

	// Handle drag-and-drop functionality
	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		// Dropped outside a droppable area
		if (!destination) {
			return;
		}

		// Dropped in the same position
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		// Find the task being dragged
		const task = tasks.find((task) => String(task.id) === draggableId);

		// Update task status based on the new drop location
		const updatedTask = { ...task, status: destination.droppableId };

		// Dispatch action to update task with new status
		dispatch(updateTask(updatedTask));
	};

	// Array of task statuses for mapping
	const taskStatuses = [
		{ id: "pending", title: "Pending" },
		{ id: "inprogress", title: "In Progress" },
		{ id: "completed", title: "Completed" },
	];

	// Filter tasks based on the selected filter value
	const getFilteredTasks = (status) => {
		return tasks
			.filter((task) => task.status === status)
			.filter((task) => {
				if (filter === "all") return true;
				return task.status === filter;
			});
	};

	return (
		<div className="task-list-container">
			<h1>Task Management Board</h1>

			{/* Error message */}
			{error && <p className="error">{error}</p>}

			{/* Filter Dropdown & Add New Task Button */}
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
				<button
					className="btn-primary"
					onClick={handleAddTask}
				>
					Add New Task
				</button>
			</div>

			<DragDropContext onDragEnd={onDragEnd}>
				<div className="task-columns">
					{taskStatuses.map((status) => (
						<Droppable
							key={status.id}
							droppableId={status.id}
						>
							{(provided, snapshot) => (
								<div
									className={`task-column ${
										snapshot.isDraggingOver
											? "dragging-over"
											: ""
									}`}
									ref={provided.innerRef}
									{...provided.droppableProps}
								>
									<h2>{status.title}</h2>
									{getFilteredTasks(status.id).map(
										(task, index) => (
											<Draggable
												key={task.id}
												draggableId={String(task.id)} // Ensure ID is a string
												index={index}
											>
												{(provided, snapshot) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className={
															snapshot.isDragging
																? "dragging"
																: ""
														}
													>
														<Task
															task={task}
															onEdit={
																handleEditTask
															}
															onDelete={
																handleDeleteTask
															}
															onStatusChange={
																handleStatusChange
															}
														/>
													</div>
												)}
											</Draggable>
										)
									)}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					))}
				</div>
			</DragDropContext>

			{/* Modal for adding/editing tasks */}
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
