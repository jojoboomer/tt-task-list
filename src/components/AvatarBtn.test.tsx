import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { AvatarBtn } from "./AvatarBtn";

describe("Avatar", () => {
  afterEach(cleanup);

  it("should render input with init task", () => {
    const props = {
      name: "John Doe",
      img: "/placeholder.png",
    };
    render(<AvatarBtn {...props} />);

    // screen.getByText("John_Doe")

  });

  // it("should render input with text", () => {
  //   const text = "This is a test message";
  //   render(<RichInput text={text} onChange={() => {}} />);

  //   const editableDiv = screen.getByTestId("editable-div");
  //   const parsedDiv = screen.getByTestId("parsed-div");

  //   expect(parsedDiv.textContent).toBe(text);
  //   expect(editableDiv.textContent).toBe(text);
  // });

  // it("should handle rich text input properly", async () => {
  //   const onChangeMock = vi.fn();
  //   const user = userEvent.setup();
    
  //   render(<RichInput text="" onChange={onChangeMock} />);
  
  //   const editableDiv = screen.getByTestId("editable-div");
  //   await user.click(editableDiv);
  //   await user.keyboard("Hello #world");
  
  //   expect(onChangeMock).toHaveBeenCalledTimes(12); 
  //   expect(screen.getByText("Hello #world"));
  // });
});
