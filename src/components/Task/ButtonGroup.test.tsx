import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../ui/button";
import ButtonGroup from "./ButtonGroup";

describe("ButtonGroup", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(
      <ButtonGroup>
        <Button role="button">1</Button>
        <Button role="button">2</Button>
        <Button role="button">3</Button>
      </ButtonGroup>
    );

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3);
  });
});
