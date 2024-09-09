# Task Manager Application with WebSockets

This is a full-stack Task Manager Application built with **React** for the frontend and **Node.js** with **Express** for the backend. The application allows users to manage tasks, supporting features like adding, updating, and emitting real-time events using **Socket.IO**.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend Setup (React)](#frontend-setup-react)
- [Backend Setup (Node.js + Express)](#backend-setup-nodejs--express)
- [API Endpoints](#api-endpoints)
- [WebSocket Events](#websocket-events)
- [Running Tests](#running-tests)
- [License](#license)

## Features

- **Task Management**: Add and update tasks.
- **Real-time Updates**: Use WebSockets to push task updates in real-time to all connected clients.
- **Task Modal**: Edit tasks in a modal window.
- **Error Handling**: Display error messages if any issue arises.
- **Responsive Design**: Works well on both desktop and mobile devices.

## Technologies Used

### Frontend

- **React**: Frontend framework for building the UI.
- **Redux**: State management for handling tasks globally.
- **Socket.IO Client**: To handle real-time events from the backend.
- **Axios**: For making API requests to the backend.
- **CSS Modules**: For styling.

### Backend

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **Socket.IO**: Real-time communication between frontend and backend.
- **File System**: Using Node.js `fs` module to simulate a database.

## Getting Started

### Prerequisites

- **Node.js** and **npm** (or **yarn**) installed on your machine.
- **MongoDB** is not needed in this project as the backend uses a file (`tasks.json`) for storage.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

## Frontend Setup (React)

### Available Scripts

In the `frontend` directory, you can run:

```bash
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Running Tests

```bash
npm test
```

Launches the test runner for React components.

## Backend Setup (Node.js + Express)

### Available Scripts

In the `backend` directory, you can run:

```bash
npm start
```

Starts the backend server in development mode on [http://localhost:5000](http://localhost:5000).

### Environment Variables

Make sure a `tasks.json` file exists in the root of the backend with an initial empty array:

```json
[]
```

### Running Tests

Currently, there are no tests for the backend.

## API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/tasks`     | Fetch all tasks         |
| POST   | `/tasks`     | Add a new task          |
| PUT    | `/tasks/:id` | Update an existing task |

### Example API Request

To fetch tasks:

```bash
GET http://localhost:5000/tasks
```

Sample response:

```json
[
  {
    "id": "1",
    "title": "Task 1",
    "description": "This is task 1",
    "status": "pending"
  },
  {
    "id": "2",
    "title": "Task 2",
    "description": "This is task 2",
    "status": "completed"
  }
]
```

## WebSocket Events

The backend uses **Socket.IO** to emit real-time task updates. Below are the events available:

| Event         | Payload       | Description                               |
| ------------- | ------------- | ----------------------------------------- |
| `taskAdded`   | `task` object | Emitted when a new task is added.         |
| `taskUpdated` | `task` object | Emitted when an existing task is updated. |

### Example Socket.IO Client Usage

```javascript
import io from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("taskAdded", (task) => {
  console.log("New task added:", task);
});

socket.on("taskUpdated", (task) => {
  console.log("Task updated:", task);
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
