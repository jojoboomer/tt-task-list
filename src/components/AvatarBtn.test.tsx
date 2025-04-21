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
  });
});
