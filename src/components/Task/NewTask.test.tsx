import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { NewTask } from "./NewTask";

describe("New Task", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(<NewTask />);

    screen.getByText("Type to add new task");
  });
});
