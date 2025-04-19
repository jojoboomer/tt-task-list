// App.test.tsx
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  afterEach(cleanup);

  it("should render main", () => {
    render(<App />);
    screen.getByRole("main");
    screen.getByRole("list");
    expect(screen.getAllByTestId("new-task")).toHaveLength(1);
  });
});
