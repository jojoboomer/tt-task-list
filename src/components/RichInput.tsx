import useParseMessage from "@/hooks/useParseMessage";
import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

interface Props {
  text: string;
  onChange: (newText: string) => void;
}

const RichInput: React.FC<Props> = ({ text, onChange }) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const parsedRef = useRef<HTMLDivElement>(null);
  const parsed = useParseMessage({ text });

  //onChange handler
  const handleInput = useCallback(() => {
    const rawText = editableRef.current?.innerText || "";
    const newText = rawText.trim() === "" ? "" : rawText;
    onChange(newText);
  }, [onChange]);

  //Scroll handler
  const handleScroll = useCallback(() => {
    if (parsedRef.current && editableRef.current) {
      parsedRef.current.scrollTop = editableRef.current.scrollTop;
    }
  }, []);

  useLayoutEffect(() => {
    if (parsedRef.current && editableRef.current) {
      parsedRef.current.scrollTop = editableRef.current.scrollTop;
    }
  }, [text]);

  //Sync state
  useEffect(() => {
    if (editableRef.current && editableRef.current.innerText !== text) {
      editableRef.current.innerText = text;
    }
  }, [text]);

  return (
    <div className="relative w-full overflow-hidden">
      {/*Front parsed*/}
      <div
        data-testid="parsed-div"
        ref={parsedRef}
        aria-hidden="true"
        className="absolute inset-0
                    overflow-y-auto
                   text-gray-800 pointer-events-none
                   whitespace-pre-wrap break-words"
      >
        {parsed || <span className="text-tertiary">Type to add new task</span>}
      </div>

      {/*Back editable*/}
      <div
        data-testid="editable-div"
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        className="relative z-10
                    overflow-y-auto
                   text-transparent caret-foreground
                   whitespace-pre-wrap break-words
                   focus:outline-none"
        onInput={handleInput}
        onScroll={handleScroll}
      />
    </div>
  );
};

export default RichInput;
