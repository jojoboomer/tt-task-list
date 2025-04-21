import App from "@/App";
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

describe("Integration test for App",  () => {
  afterEach(cleanup);

  it("should render", async () => {
    render(<App />);

    const task = screen.getByTestId("new-task");
    await userEvent.click(task);

    screen.getByRole("main");
    screen.getByRole("list");
    expect(screen.getAllByTestId("new-task")).toHaveLength(1);

  });
});
