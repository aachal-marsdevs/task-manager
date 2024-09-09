import React from "react";
import { render, screen } from "@testing-library/react";
import TaskDragDropContext from "./TaskDragDropContext";
import { act } from "react-dom/test-utils";

describe("TaskDragDropContext Component", () => {
  const mockTasks = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      status: "pending",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      status: "inprogress",
    },
  ];

  it("should render task columns for each status", () => {
    render(
      <TaskDragDropContext
        tasks={mockTasks}
        filter="all"
        handleEditTask={jest.fn()}
        handleStatusChange={jest.fn()}
      />
    );

    // Ensure all task columns render correctly
    expect(
      screen.getByRole("heading", { name: /pending/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /in progress/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /completed/i })
    ).toBeInTheDocument();
  });

  it("should call handleStatusChange after drag-and-drop", () => {
    const handleStatusChange = jest.fn();

    render(
      <TaskDragDropContext
        tasks={mockTasks}
        filter="all"
        handleEditTask={jest.fn()}
        handleStatusChange={handleStatusChange}
      />
    );

    // Simulate the drag and drop event by directly calling onDragEnd
    const result = {
      destination: { droppableId: "inprogress", index: 0 },
      source: { droppableId: "pending", index: 0 },
      draggableId: "1",
    };

    // Simulate the onDragEnd event
    act(() => {
      const dragDropContext = screen.getByTestId("task-columns");
      const dragDropContextInstance =
        dragDropContext._reactInternals.child.stateNode;
      dragDropContextInstance.onDragEnd(result);
    });

    // Verify handleStatusChange was called with correct arguments
    expect(handleStatusChange).toHaveBeenCalledWith("1", "inprogress");
  });
});
