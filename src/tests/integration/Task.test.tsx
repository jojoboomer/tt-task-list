import { Task } from "@/components/Task/Task";
import { queryClient } from "@/lib/queryClient";
import { updateTask } from "@/supabase/TaskService";
import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/supabase/TaskService", () => ({
  updateTask: vi.fn().mockResolvedValue({
    id: "123",
    title: "Dummy text updated",
    status: "completed",
    created_at: new Date().toISOString(),
  }),
}));

describe("Integration test for Task component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("Slould update a task", async () => {
    const user = userEvent.setup();

    const mockTask: Task = {
      id: "1",
      title: "Dummy text",
      status: "pending",
      created_at: "",
    };

    render(
      <QueryClientProvider client={queryClient}>
        <Task data={mockTask as Task} />
      </QueryClientProvider>
    );
    screen.getByText("Dummy text");
    const inputRadOnly = screen.getByText("Dummy text");
    await user.click(inputRadOnly);
    const input = screen.getByTestId("editable-div");
    await user.type(input, " updated");
    screen.getAllByText("Dummy text updated");

    const addBtn = screen.getByText("Save");
    expect(addBtn?.tagName).toBe("BUTTON");
    await user.click(addBtn);

    expect(updateTask).toHaveBeenCalledTimes(1);
    expect(updateTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Dummy text updated",
      })
    );
  });

  it("Cancel event should not update the task", async () => {
    const user = userEvent.setup();

    const mockTask: Task = {
      id: "1",
      title: "Dummy text",
      status: "pending",
      created_at: "",
    };

    render(
      <QueryClientProvider client={queryClient}>
        <Task data={mockTask as Task} />
      </QueryClientProvider>
    );
    screen.getByText("Dummy text");
    const inputRadOnly = screen.getByText("Dummy text");
    await user.click(inputRadOnly);
    const input = screen.getByTestId("editable-div");
    await user.type(input, " updated");
    screen.getAllByText("Dummy text updated");

    const addBtn = screen.getByText("Cancel");
    expect(addBtn?.tagName).toBe("BUTTON");
    await user.click(addBtn);
    
    screen.getByText("Dummy text");
  });
});
