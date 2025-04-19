interface Props {
  text?: readonly React.ReactNode[] | null | string;
}

const TaskTitle = ({ text }: Props) => {
  return <span className="text-tertiary">{text ?? "Type to add new task"}</span>;
};

export default TaskTitle;

