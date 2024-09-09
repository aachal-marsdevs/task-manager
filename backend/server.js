const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Initialize Express app and server
const app = express();
const server = http.createServer(app);

// Configure Socket.IO with CORS
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:3000", // Allow requests from your React frontend
		methods: ["GET", "POST", "PUT"],
	},
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Simulate in-memory storage for tasks
const tasksFilePath = path.join(__dirname, "tasks.json");
let tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

// Helper function to save tasks to file (simulating a database)
const saveTasks = (tasks) => {
	fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// API Endpoints

// Get all tasks
app.get("/tasks", (req, res) => {
	res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
	const { title, description } = req.body;
	const newTask = {
		id: tasks.length + 1,
		title,
		description,
		status: "pending",
	};
	tasks.push(newTask);
	saveTasks(tasks);

	// Emit event to all clients
	io.emit("taskAdded", newTask);

	res.status(201).json(newTask);
});

// Update a task's status
app.put("/tasks/:id", (req, res) => {
	const taskId = parseInt(req.params.id);
	const { status, description, title } = req.body;
	const task = tasks.find((t) => t.id === taskId);

	if (task) {
		task.status = status;
		task.description = description;
		task.title = title;
		saveTasks(tasks);

		// Emit event to all clients
		io.emit("taskUpdated", task);

		res.json(task);
	} else {
		res.status(404).json({ message: "Task not found" });
	}
});

// Socket.IO Connection
io.on("connection", (socket) => {
	console.log("New client connected:", socket.id);

	socket.on("disconnect", () => {
		console.log("Client disconnected:", socket.id);
	});
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
