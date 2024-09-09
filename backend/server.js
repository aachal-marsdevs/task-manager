const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(cors());
app.use(express.json());

const tasksFilePath = path.join(__dirname, "tasks.json");
let tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

const saveTasks = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
  };
  tasks.push(newTask);
  saveTasks(tasks);

  io.emit("taskAdded", newTask);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { status, description, title } = req.body;
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.status = status;
    task.description = description;
    task.title = title;
    saveTasks(tasks);

    io.emit("taskUpdated", task);

    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
