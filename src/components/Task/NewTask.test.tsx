import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { NewTask } from "./NewTask";

describe("ButtonGroup", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(<NewTask />);

    // screen.getAllByText("Type to add new task");
  });
});
