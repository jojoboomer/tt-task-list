import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { TextDecorator } from "./TextDecorator";

describe("Text decorator component", () => {
  afterEach(cleanup);

  const renderSpan = (
    <TextDecorator
      key=""
      className=""
      component="span"
      children="Dummy text"
    />
  );

  const renderBadge = (
    <TextDecorator
      key=""
      className=""
      component="badge"
      children="Dummy text"
      icon={"mail"}
    />
  );

  it("return span", () => {
    render(renderSpan);
    const spanElement = screen.getByText('Dummy text');
    expect(spanElement.tagName).toBe('SPAN'); 
  });

  it("return badge", () => {
    render(renderBadge);
    screen.getByText('Dummy text');
    //TODO
  });

});
