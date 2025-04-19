import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { Task } from "./Task";

describe("ButtonGroup", () => {
  afterEach(cleanup);

  const data: Task = {
    id: 1,
    title:
      "#Important Write to some_email@gmail.com and tell @natasha about https://staging.alldone.app",
    status: "pending",
    created_at: "",
  };

  it("should render", () => {
    render(<Task data={data} />);

    screen.getByText("natasha", {exact: false})
  });
});
