import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useParseMessage from "./useParseMessage";

describe("useParseMessage hook", () => {
  const renderUseParseMessage = (text: string, readOnly = false) => {
    return renderHook(() => useParseMessage({ text, readOnly })).result.current;
  };

  it("return empty text", () => {
    const result = renderUseParseMessage("");
    expect(result).toBeNull();
  });

  it("return simple text", () => {
    const text = "Dummy text";
    const result = renderUseParseMessage(text);

    expect(result).toBeTypeOf("object");
    expect(result).toHaveLength(1);
    expect(result).toEqual([text]);
  });

  it("url coverage", () => {
    const text = "This url www.google.com is valid as http://www.google.com or https://www.google.com";
    const result = renderUseParseMessage(text, true);

    expect(result).toHaveLength(6);
    expect(result?.[1]).toMatchObject({
      props: {
        children: "www.google.com",
      },
    });
    expect(result?.[3]).toMatchObject({
      props: {
        children: "http://www.google.com",
      },
    });
    expect(result?.[5]).toMatchObject({
      props: {
        children: "https://www.google.com",
      },
    });
  });
});
