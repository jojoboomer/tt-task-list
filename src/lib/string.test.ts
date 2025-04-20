import { cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { createInitialsAvatar, toSnakeCase } from "./string";

describe("canvertToSnakeCase", () => {
  afterEach(cleanup);

  const snakeCase = toSnakeCase("This dummy text");
  const svgIcon = createInitialsAvatar("  John   Doe  ");

  it("should transform text to snake case", () => {
    expect(snakeCase).toBe("this_dummy_text");
  });

  it("should create svg icon", () => {
    expect(svgIcon).toMatch(/^data:image\/svg\+xml;base64,[A-Za-z0-9+/]+={0,2}$/);
    const base64Data = svgIcon.split(',')[1];
    const svgText = atob(base64Data);
    expect(svgText).toContain('<svg');
    expect(svgText).toContain('JD');
  });
});
