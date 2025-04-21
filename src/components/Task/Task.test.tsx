import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { Task } from "./Task";

describe("Task", () => {
  afterEach(cleanup);

  const data: Task = {
    id: "1",
    title:
      "#Important Write to some_email@gmail.com and tell @natasha about https://staging.alldone.app",
    status: "pending",
    created_at: "",
  };

  it("should render", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Task data={data} />
      </QueryClientProvider>
    );

    screen.getByText("natasha", { exact: false });
  });
});
