import { render, screen, fireEvent } from "@testing-library/react";
import TaskModal from "./TaskModal";

describe("TaskModal Component", () => {
  const mockTask = {
    id: "1",
    title: "Task Title",
    description: "Task Description",
    status: "pending",
  };

  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it("should render modal with correct form fields", () => {
    render(
      <TaskModal
        isOpen={true}
        onClose={jest.fn()}
        onSubmit={jest.fn()}
        task={mockTask}
      />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue("Task Title");
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      "Task Description"
    );
    expect(screen.getByLabelText(/status/i)).toHaveValue("pending");
  });

  it("should call onSubmit with correct values when form is submitted", () => {
    const onSubmit = jest.fn();
    render(
      <TaskModal
        isOpen={true}
        onClose={jest.fn()}
        onSubmit={onSubmit}
        task={mockTask}
      />
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: "completed" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /update task/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      id: "1",
      title: "New Title",
      description: "New Description",
      status: "completed",
    });
  });

  it("should call onClose when Cancel button is clicked", () => {
    const onClose = jest.fn();
    render(
      <TaskModal
        isOpen={true}
        onClose={onClose}
        onSubmit={jest.fn()}
        task={mockTask}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
