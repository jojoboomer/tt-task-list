// App.test.tsx
import App from "@/App";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

describe("Integration test for App", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(<App />);
    screen.getByRole("main");
    screen.getByRole("list");
    expect(screen.getAllByTestId("new-task")).toHaveLength(1);
  });
});
