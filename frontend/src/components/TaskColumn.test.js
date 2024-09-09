import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskColumn from "./TaskColumn";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { DragDropContext } from "react-beautiful-dnd";

// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({});

const mockTasks = [
  { id: "1", title: "Task 1", description: "Description 1", status: "pending" },
  { id: "2", title: "Task 2", description: "Description 2", status: "pending" },
];

const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <DragDropContext onDragEnd={() => {}}>{ui}</DragDropContext>
    </Provider>
  );
};

describe("TaskColumn Component", () => {
  it("should render task column with tasks", () => {
    renderWithProviders(
      <TaskColumn
        status={{ id: "pending", title: "Pending" }}
        tasks={mockTasks}
        handleEditTask={jest.fn()}
      />
    );

    // Use test id to select the column title
    expect(screen.getByTestId("column-title-pending")).toBeInTheDocument();

    // Assert that tasks are rendered
    mockTasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
    });
  });

  it("should call handleEditTask when edit is clicked on a task", () => {
    const handleEditTask = jest.fn();
    renderWithProviders(
      <TaskColumn
        status={{ id: "pending", title: "Pending" }}
        tasks={mockTasks}
        handleEditTask={handleEditTask}
      />
    );

    // Use the test id to select the edit button for the first task
    fireEvent.click(screen.getByTestId("edit-button-1"));

    // Assert that handleEditTask was called with the correct task data
    expect(handleEditTask).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("should render draggable tasks", () => {
    renderWithProviders(
      <TaskColumn
        status={{ id: "pending", title: "Pending" }}
        tasks={mockTasks}
        handleEditTask={jest.fn()}
      />
    );

    // Use the test id to select the draggable element
    const draggableTask = screen.getByTestId("draggable-task-1");
    expect(draggableTask).toHaveAttribute("data-rbd-draggable-id", "1");
  });
});
