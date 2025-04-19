import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import RichInput from "./RichInput";

describe("Rich intput", () => {
  afterEach(cleanup);

  it("should render input with init task", () => {
    render(<RichInput text="" onChange={() => {}} />);

    const editableDiv = screen.getByTestId("editable-div");
    const parsedDiv = screen.getByTestId("parsed-div");

    expect(parsedDiv.textContent).toBe("Type to add new task");
    expect(editableDiv.textContent).toBe("");
  });

  it("should render input with text", () => {
    const text = "This is a test message";
    render(<RichInput text={text} onChange={() => {}} />);

    const editableDiv = screen.getByTestId("editable-div");
    const parsedDiv = screen.getByTestId("parsed-div");

    expect(parsedDiv.textContent).toBe(text);
    expect(editableDiv.textContent).toBe(text);
  });

  it("should handle rich text input properly", async () => {
    const onChangeMock = vi.fn();
    const user = userEvent.setup();
    
    render(<RichInput text="" onChange={onChangeMock} />);
  
    const editableDiv = screen.getByTestId("editable-div");
    await user.click(editableDiv);
    await user.keyboard("Hello #world");
  
    expect(onChangeMock).toHaveBeenCalledTimes(12); 
    expect(screen.getByText("Hello #world"));
  });
});
