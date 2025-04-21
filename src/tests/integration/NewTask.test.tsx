import { NewTask } from "@/components/Task/NewTask";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/supabase/TaskService", () => ({
  fetchTasks: vi.fn().mockResolvedValue([
    {
      id: "1234",
      title: "old #task",
      status: "pending",
      created_at: new Date().toISOString(),
    },
  ]),
  insertTask: vi.fn().mockResolvedValue({
    id: "123",
    title: "#test",
    status: "pending",
    created_at: new Date().toISOString(),
  }),
  updateTask: vi.fn().mockResolvedValue({
    id: "123",
    title: "#test updated",
    status: "completed",
    created_at: new Date().toISOString(),
  }),
}));

describe("Integration test for New Task component", () => {
  afterEach(() => {
    cleanup();
  });

  it("On calling the NewTask component, it should render and add a new task using Supabase", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewTask />
      </QueryClientProvider>
    );

    const { insertTask } = await import("@/supabase/TaskService");
    const user = userEvent.setup();

    await user.click(screen.getByTestId("new-task"));
    const okBtn = screen.getByText("Ok").parentElement;
    const todayBtn = screen.getByText("Today").parentElement;
    expect(okBtn).not.toBeDisabled();
    expect(todayBtn).toBeDisabled();

    const input = screen.getByTestId("editable-div");
    await user.type(input, "#test");

    const text = screen.getAllByText("#test");
    expect(text).toHaveLength(2);

    expect(todayBtn).not.toBeDisabled();

    const addBtn = screen.getByText("Add");
    expect(addBtn?.tagName).toBe("BUTTON");
    await user.click(addBtn);

    expect(insertTask).toHaveBeenCalledTimes(1);
    expect(insertTask).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "#test",
        status: "pending",
      })
    );

    await vi.waitFor(() => {
      expect(insertTask).toHaveBeenCalledTimes(1);
    });
  });

  it("Slould update a task using Supabase", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewTask />
      </QueryClientProvider>
    );
  });
});
