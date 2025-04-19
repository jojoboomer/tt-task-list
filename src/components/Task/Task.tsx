import useParseMessage from "@/hooks/useParseMessage";
import useTaskStore from "@/store/tasklist";
import { useCallback, useState } from "react";
import RichInput from "../RichInput";
import TaskTitle from "../TaskTitle";
import { Checkbox } from "../ui/checkbox";
import { ButtonBar } from "./ButtonBar";

interface TaskProps {
  data: Task;
}

export const Task = ({ data }: TaskProps) => {
  const [text, setText] = useState<string>(data.title);
  const { updateTask, activeTask, setActiveTask } = useTaskStore();
  const active = activeTask === data.id;
  const parsed = useParseMessage({ text, readOnly: !active });

  const handleMessageChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const handleCancel = useCallback(() => {
    setText(data.title);
    setActiveTask(null);
  }, [data, setActiveTask]);

  const handleSave = useCallback(() => {
    // We can set all the data in the task, but test only ask for title
    updateTask({ ...data, title: text });
    setActiveTask(null);
  }, [text, data, updateTask, setActiveTask]);

  const handleClick = useCallback(() => {
    if (!active) {
      setActiveTask(data.id);
    }
  }, [active, data.id, setActiveTask]);

  return (
    <div
      onClick={handleClick}
      className={`mt-2 rounded-md ${
        active ? "shadow-md " : "hover:cursor-pointer active:opacity-50"
      }`}
    >
      <div
        className={`px-4 py-1 w-full flex items-center gap-2 rounded-t-md ${
          active ? "border border-gray-300" : ""
        }`}
      >
        {/* Test instructions dont ask for Checkbox funcionality */}
        <Checkbox className="size-5" />
        {active ? (
          <RichInput text={text} onChange={handleMessageChange} />
        ) : (
          <TaskTitle text={parsed} />
        )}
      </div>
      {active && (
        <ButtonBar
          disabled={!text}
          onCancel={handleCancel}
          onApply={handleSave}
          newComp={false}
          edited={text !== data.title}
        />
      )}
    </div>
  );
};
