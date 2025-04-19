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

  it("return text complex text", () => {
    const text =
      "#test from http://DummyText.com with @arroba to address@example.com";
    const result = renderUseParseMessage(text);

    expect(result).toHaveLength(7);
    expect(result?.[0]).toMatchObject({
      type: "span",
      props: {
        className: "text-hashtag-foreground",
        children: "#test",
      },
    });
    expect(result?.[2]).toMatchObject({
      props: {
        className: "text-url-foreground underline",
        children: "http://DummyText.com",
      },
    });
    expect(result?.[4]).toMatchObject({
      props: {
        className: "text-arroba-foreground",
      },
    });

    expect(result?.[6]).toMatchObject({
      props: {
        className: "text-mailto-foreground underline",
        children: "address@example.com",
      },
    });
  });

  it("return text complex text readOnly", () => {
    const text = "#test with @arroba";
    const result = renderUseParseMessage(text, true);

    expect(result).toHaveLength(3);
    expect(result?.[0]).toMatchObject({
      type: "span",
      props: {
        className:
          "text-hashtag-foreground bg-hashtag rounded-xl py-0.5 px-2 mx-1",
        children: "#test",
      },
    });
    expect(result?.[2]).toMatchObject({
      props: {
        className:
          "text-arroba-foreground bg-arroba rounded-xl py-0.5 px-2 mx-1",
        children: "@arroba",
      },
    });
  });
});
