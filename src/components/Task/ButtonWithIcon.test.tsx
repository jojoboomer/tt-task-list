import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Maximize2 } from "lucide-react";
import { afterEach, describe, expect, it, vitest } from "vitest";
import ButtonWithIcon from "./ButtonWithIcon";

describe("Button Bar", () => {
  const defaultProps = {
    icon: () => <Maximize2 />,
    label: "Test Label",
    className: "custom-class",
  };

  afterEach(cleanup);

  it("should render", () => {
    render(<ButtonWithIcon {...defaultProps} />)

    screen.getByRole("button");
    screen.getByText('Test Label');
    //Todo get the icon
  });

  it("click event", async () => {
    const handleClick = vitest.fn();
    render(<ButtonWithIcon {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("click event on disable state", async () => {
    const handleClick = vitest.fn();
    render(<ButtonWithIcon {...defaultProps} disabled onClick={handleClick} />);

    const button = screen.getByRole("button");
    button.hasAttribute('disable');
    
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
