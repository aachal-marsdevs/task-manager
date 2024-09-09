import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskColumn from "./TaskColumn";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { DragDropContext } from "react-beautiful-dnd";

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

    expect(screen.getByTestId("column-title-pending")).toBeInTheDocument();

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

    fireEvent.click(screen.getByTestId("edit-button-1"));

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

    const draggableTask = screen.getByTestId("draggable-task-1");
    expect(draggableTask).toHaveAttribute("data-rbd-draggable-id", "1");
  });
});
