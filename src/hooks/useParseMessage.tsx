import { TextDecorator } from "@/components/TextDecorator";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const baseReadOnlyClassName = "rounded-xl font-normal";
const baseClassName = "text-base";

const REGEXES: {
  regex: RegExp;
  className: string;
  readOnlyclassName: string;
  prefix: string;
  icon?: string;
}[] = [
  {
    //simple regex for mailto not inclue special cases
    regex: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g,
    className: `text-mailto-foreground ${baseClassName}`,
    readOnlyclassName: `text-mailto-foreground bg-mailto ${cn(baseClassName, baseReadOnlyClassName)}`,
    prefix: "email",
    icon: "mail",
  },
  {
    //not include regex for particular cases (.com, .org, etc) not specificed in test
    regex: /(https?:\/\/|www\.)[^\s]+/g,
    className: `text-url-foreground ${baseClassName}`,
    readOnlyclassName: `text-url-foreground bg-url ${cn(baseClassName, baseReadOnlyClassName)}`,
    prefix: "url",
    icon: "link",
  },
  {
    //not include special characters for metions (i assume that @ is for usernames)
    regex: /@(\w+)/g,
    className: `text-arroba-foreground ${baseClassName}`,
    readOnlyclassName: `text-arroba-foreground bg-arroba ${cn(baseClassName, baseReadOnlyClassName)}`,
    prefix: "arroba",
  },
  {
    regex: /#([^\s]+)/g,
    className: `text-hashtag-foreground ${baseClassName}`,
    readOnlyclassName: `text-hashtag-foreground bg-hashtag ${cn(baseClassName, baseReadOnlyClassName)}`,
    prefix: "hashtag",
  },
];

export default function useParseMessage({
  text,
  readOnly = false,
}: {
  text: string;
  readOnly?: boolean;
}) {
  return useMemo<readonly (string | React.ReactNode)[] | null>(() => {
    if (!text) return null;
    let parts: Array<string | React.ReactNode> = [text];

    for (const {
      regex,
      className,
      readOnlyclassName,
      prefix,
      icon,
    } of REGEXES) {
      parts = parts.flatMap((part, idx) => {
        if (typeof part !== "string") return [part]; //previous part transformed

        const out: Array<string | React.ReactNode> = [];
        let lastIndex = 0,
          match;
        regex.lastIndex = 0;

        while ((match = regex.exec(part)) !== null) {
          //get the start and end of the match
          const start = match.index,
            end = start + match[0].length;

          if (start > lastIndex) out.push(part.slice(lastIndex, start));

          out.push(
            <TextDecorator
              key={`${prefix}-${idx}-${start}`}
              component={readOnly ? "badge" : "span"}
              className={readOnly ? readOnlyclassName : className}
              icon={icon}
            >
              {match[0]}
            </TextDecorator>
          );

          lastIndex = end;
        }
        if (lastIndex < part.length) out.push(part.slice(lastIndex));
        return out;
      });
    }

    // Saltos de línea
    return parts.flatMap<string | React.ReactNode>((part, i) =>
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
