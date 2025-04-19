import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Button } from "../ui/button";
import ButtonGroup from "./ButtonGroup";
import ButtonWithIcon from "./ButtonIcon";

interface Props {
  disabled?: boolean;
  newComp: boolean;
  edited?: boolean;
  onCancel: () => void;
  onApply: () => void;
}

export const ButtonBar = ({
  disabled = false,
  onCancel,
  onApply,
  newComp,
  edited = false,
}: Props) => {
  
  const renderLeftButtons = () => (
    <div className="flex flex-1 gap-4">
      <Button
        role="button"
        disabled={disabled}
        variant="secondary"
        className="bg-default"
      >
        <DynamicIcon name="maximize-2" className="size-5 text-secondary" />
        <span className="hidden xl:block">Open</span>
      </Button>
      <ButtonWithIcon
        icon={"maximize-2"}
        label={"Open"}
        role="button"
        disabled={disabled}
        variant="secondary"
        className="bg-default"
      />
      <ButtonGroup>
        {[
          { name: "calendar", label: "Today" },
          { name: "unlock", label: "Public" },
          { name: "loader", label: "Highlight" },
          { name: "disc", label: "Estimation", extraClass: "py-2 pr-6 pl-4" },
        ].map(({ name, label, extraClass = "" }) => (
          <Button
            role="button"
            key={name}
            className={`text-tertiary border-border ${extraClass}`}
            disabled={disabled}
            variant="outline"
          >
            <DynamicIcon name={name as IconName} className="size-5" />
            <span className="hidden xl:block">{label}</span>
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );

  const renderRightButtons = () => (
    <ButtonGroup className="xl:flex hidden">
      <Button role="action" className="bg-default" onClick={onCancel} variant="secondary">
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
