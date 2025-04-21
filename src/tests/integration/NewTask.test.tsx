import { NewTask } from "@/components/Task/NewTask";
import { queryClient } from "@/lib/queryClient";
import useTaskStore from "@/store/tasklist";
import { QueryClientProvider } from "@tanstack/react-query";
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Integration test for New Task component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render", async  () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewTask/>
      </QueryClientProvider>
    );
    useTaskStore.setState({ taskList: [] });
    const addTaskSpy = vi.spyOn(useTaskStore.getState(), 'addTask');
    const user = userEvent.setup();

    await user.click(screen.getByTestId('new-task'));
    const okBtn = screen.getByText('Ok').parentElement;
    const todayBtn = screen.getByText('Today').parentElement;
    expect(okBtn).not.toBeDisabled();
    expect(todayBtn).toBeDisabled();

    const input = screen.getByTestId('editable-div');
    await user.type(input, '#test');
    const text = screen.getAllByText('#test')
    expect(text).toHaveLength(2);

    expect(todayBtn).not.toBeDisabled();
    const addBtn = screen.getByText('Add');
    expect(addBtn?.tagName).toBe('BUTTON');

    await user.click(addBtn);
    expect(addTaskSpy).toHaveBeenCalledTimes(1);
    expect(addTaskSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: '#test',
        status: 'pending'
      })
    );

    await vi.waitFor(() => {
      const { taskList } = useTaskStore.getState();
      expect(taskList).toHaveLength(1);
      console.log(taskList);
      expect(taskList[0].title).toBe('#test');
    });
  });
});
