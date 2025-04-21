import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accessibility } from "lucide-react";
import { afterEach, describe, expect, it, vitest } from "vitest";
import ButtonWithIcon from "./ButtonWithIcon";

describe("Button Bar", () => {
  const defaultProps = {
    icon: Accessibility,
    label: "Test Label",
    className: "custom-class",
  };

  afterEach(cleanup);

  it("should render", () => {
    render(<ButtonWithIcon {...defaultProps} />);

    screen.getByRole("button");
    screen.getByText("Test Label");
    // TODO: get the icon
  });

  it("should call onClick when clicked", async () => {
    const handleClick = vitest.fn();
    render(<ButtonWithIcon {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when disabled", async () => {
    const handleClick = vitest.fn();
    render(<ButtonWithIcon {...defaultProps} disabled onClick={handleClick} />);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});