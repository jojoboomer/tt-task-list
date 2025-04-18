import useParseMessage from "@/hooks/useParseMessage";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

interface Props {
  text: string;
  onChange: (newText: string) => void;
}

const RichInput: React.FC<Props> = ({ text, onChange }) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const parsedRef  = useRef<HTMLDivElement>(null);
  const parsed     = useParseMessage( { text, readOnly: false });

  // 1. Al escribir, actualiza el estado padre
  const handleInput = useCallback(() => {
    const rawText = editableRef.current?.innerText || "";
  const newText = rawText.trim() === '' ? '' : rawText;
    onChange(newText);
  }, [onChange]);

  // 2. Al hacer scroll en la capa editable, mueve el de la capa parseada
  const handleScroll = useCallback(() => {
    if (parsedRef.current && editableRef.current) {
      parsedRef.current.scrollTop = editableRef.current.scrollTop;
    }
  }, []);

  // 3. Al cambiar `text`, forzamos el mismo scroll (evita flicker)
  useLayoutEffect(() => {
    if (parsedRef.current && editableRef.current) {
      parsedRef.current.scrollTop = editableRef.current.scrollTop;
    }
  }, [text]);

  // 4. Sincroniza el contenido inicial / externo
  useEffect(() => {
    if (
      editableRef.current &&
      editableRef.current.innerText !== text
    ) {
      editableRef.current.innerText = text;
    }
  }, [text]);

  return (
    <div
      className="relative w-full overflow-hidden">
      {/* capa de parseado detrás (no accesible, sin pointer events) */}
      <div
        ref={parsedRef}
        aria-hidden="true"
        className="absolute inset-0
                    overflow-y-auto
                   text-gray-800 pointer-events-none
                   whitespace-pre-wrap break-words"
      >
        {parsed || (
          <span className="text-tertiary">
            Type to add new task
          </span>
        )}
      </div>

      {/* capa editable encima (texto transparente, caret visible) */}
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        className="relative z-10
                    overflow-y-auto
                   text-transparent caret-black
                   whitespace-pre-wrap break-words
                   focus:outline-none"
        onInput={handleInput}
        onScroll={handleScroll}
      />
    </div>
  );
};

export default RichInput;
