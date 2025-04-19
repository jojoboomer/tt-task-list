import { DynamicIcon } from "lucide-react/dynamic";
import { Button } from "../ui/button";
import ButtonGroup from "./ButtonGroup";
import ButtonWithIcon from "./ButtonWithIcon";

interface Props {
  disabled?: boolean;
  newComp: boolean;
  edited?: boolean;
  onCancel: () => void;
  onApply: () => void;
}

const toolbarButtons = [
  { icon: "calendar", label: "Today" },
  { icon: "unlock", label: "Public" },
  { icon: "loader", label: "Highlight" },
  { icon: "disc", label: "Estimation", extraClass: "py-2 pr-6 pl-4" },
];

export const ButtonBar = ({
  disabled = false,
  onCancel,
  onApply,
  newComp,
  edited = false,
}: Props) => {
  const renderLeftButtons = () => (
    <div className="flex flex-1 gap-4">
      <ButtonWithIcon
        icon={"maximize-2"}
        label={"Open"}
        role="button"
        disabled={disabled}
        variant="secondary"
        className="bg-default"
        iconClassName="text-secondary"
        labelClassName="text-black"
      />
      <ButtonGroup>
        {toolbarButtons.map(({ icon, label, extraClass = "" }) => (
          <ButtonWithIcon
            label={label}
            role="button"
            key={label}
            icon={icon}
            className={extraClass}
            disabled={disabled}
            variant="outline"
          />
        ))}
      </ButtonGroup>
    </div>
  );

  const renderRightButtons = () => (
    <ButtonGroup className="xl:flex hidden">
      <Button
        role="action"
        className="bg-default"
        onClick={onCancel}
        variant="secondary"
      >
        Cancel
      </Button>
      <Button role="action" onClick={onApply}>
        {newComp ? (edited ? "Add" : "Ok") : "Save"}
      </Button>
    </ButtonGroup>
  );

  const renderMobileButtons = () => (
    <ButtonGroup className="inline xl:hidden">
      {edited ? (
        <Button role="action" size="icon" onClick={onApply}>
          <DynamicIcon
            name={newComp ? "plus" : "save"}
            className="size-5"
            color="white"
          />
        </Button>
      ) : (
        <Button role="action" size="icon" onClick={onCancel}>
          <DynamicIcon name="x" className="size-5" color="white" />
        </Button>
      )}
    </ButtonGroup>
  );

  return (
    <div className="p-2 flex">
      {renderLeftButtons()}
      {renderRightButtons()}
      {renderMobileButtons()}
    </div>
  );
};
