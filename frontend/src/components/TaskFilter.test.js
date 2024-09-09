import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskFilter from "./TaskFilter"; // adjust the path according to your file structure

describe("TaskFilter Component", () => {
  it("should render filter dropdown and Add Task button", () => {
    render(
      <TaskFilter
        filter="all"
        setFilter={jest.fn()}
        handleAddTask={jest.fn()}
      />
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add New Task/i })
    ).toBeInTheDocument();
  });

  it("should call setFilter when a new filter is selected", () => {
    const setFilter = jest.fn();
    render(
      <TaskFilter
        filter="all"
        setFilter={setFilter}
        handleAddTask={jest.fn()}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "completed" },
    });
    expect(setFilter).toHaveBeenCalledWith("completed");
  });

  it("should call handleAddTask when Add Task button is clicked", () => {
    const handleAddTask = jest.fn();
    render(
      <TaskFilter
        filter="all"
        setFilter={jest.fn()}
        handleAddTask={handleAddTask}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Add New Task/i }));
    expect(handleAddTask).toHaveBeenCalledTimes(1);
  });
});
