import { useMemo } from "react";

const baseReadOnlyClassName = "rounded-xl py-0.5 px-2 mx-1";

const REGEXES: {
  regex: RegExp;
  className: string;
  readOnlyclassName: string;
  prefix: string;
}[] = [
  {
    regex: /@(\w+)/g,
    className: "text-arroba-foreground",
    readOnlyclassName: `text-arroba-foreground bg-arroba ${baseReadOnlyClassName}`,
    prefix: "arroba",
  },
  {
    regex: /#(\w+)/g,
    className: "text-hashtag-foreground ",
    readOnlyclassName: `text-hashtag-foreground bg-hashtag ${baseReadOnlyClassName}`,
    prefix: "hashtag",
  },
  {
    regex: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
    className: "text-mailto-foreground underline",
    readOnlyclassName: `text-mailto-foreground bg-mailto ${baseReadOnlyClassName}`,
    prefix: "email",
  },
  {
    regex: /https?:\/\/[^\s]+/g,
    className: "text-url-foreground underline",
    readOnlyclassName: `text-url-foreground bg-url ${baseReadOnlyClassName}`,
    prefix: "url",
  },
];

export default function useParseMessage({
  text,
  readOnly = false,
}: {
  text: string;
  readOnly?: boolean;
}) {
  return useMemo(() => {
    if (!text) return null;
    let parts: Array<string | React.ReactNode> = [text];

    for (const { regex, className, readOnlyclassName, prefix } of REGEXES) {
      parts = parts.flatMap((part, idx) => {
        if (typeof part !== "string") return [part];
        const out: Array<string | React.ReactNode> = [];
        let lastIndex = 0,
          match;

        regex.lastIndex = 0;
        while ((match = regex.exec(part)) !== null) {
          const start = match.index,
            end = start + match[0].length;
          if (start > lastIndex) out.push(part.slice(lastIndex, start));
          out.push(
            <span key={`${prefix}-${idx}-${start}`} className={readOnly ? readOnlyclassName : className}>
              {match[0]}
            </span>
          );
          lastIndex = end;
        }
        if (lastIndex < part.length) out.push(part.slice(lastIndex));
        return out;
      });
    }

    // Saltos de línea
    return parts.flatMap((part, i) =>
      typeof part === "string"
        ? part
            .split("\n")
            .flatMap((line, li, arr) =>
              arr[li + 1] ? [line, <br key={`br-${i}-${li}`} />] : [line]
            )
        : [part]
    );
  }, [text]);
}
