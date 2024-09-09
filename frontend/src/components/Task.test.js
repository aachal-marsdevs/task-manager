import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Task from "./Task";

describe("Task Component", () => {
  const mockTask = {
    id: "1",
    title: "Test Task",
    description: "Test Description",
    status: "pending",
  };

  it("should render task with title, description, and status", () => {
    render(
      <Task task={mockTask} onEdit={jest.fn()} onStatusChange={jest.fn()} />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("pending");
  });

  it("should call onEdit when the edit icon is clicked", () => {
    const mockOnEdit = jest.fn();
    render(
      <Task task={mockTask} onEdit={mockOnEdit} onStatusChange={jest.fn()} />
    );

    fireEvent.click(screen.getByTestId("edit-icon")); // Use getByTestId here

    expect(mockOnEdit).toHaveBeenCalledWith(mockTask);
  });

  it("should change status when status dropdown is changed", () => {
    const mockOnStatusChange = jest.fn();
    render(
      <Task
        task={mockTask}
        onEdit={jest.fn()}
        onStatusChange={mockOnStatusChange}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "completed" },
    });

    expect(mockOnStatusChange).toHaveBeenCalledWith(mockTask.id, "completed");
  });
});
