import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { NewTask } from "./NewTask";

describe("New Task", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NewTask/>
      </QueryClientProvider>
    );

    screen.getByText("Type to add new task");
  });
});
