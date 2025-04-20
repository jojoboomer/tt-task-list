import { Calendar, Disc, Highlighter, Maximize2, Plus, Save, Unlock, X } from "lucide-react";
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

type IconName = "calendar" | "unlock" | "highlighter" | "disc";

// Mapeo de íconos a componentes
const iconComponents: Record<IconName, React.ComponentType< { className?: string }>> = {
  calendar: Calendar,
  unlock: Unlock,
  highlighter: Highlighter,
  disc: Disc
};

const toolbarButtons = [
  { icon: "calendar", label: "Today" },
  { icon: "unlock", label: "Public" },
  { icon: "highlighter", label: "Normal" },
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
        icon={Maximize2}
        label={"Open"}
        role="button"
        disabled={disabled}
        variant="secondary"
        className="bg-default"
        iconClassName="text-secondary"
        labelClassName="text-black"
      />
      <ButtonGroup>
        {toolbarButtons.map(({ icon, label, extraClass = "" }) => {
          const IconComponent = iconComponents[icon];
          return (
            <ButtonWithIcon
              label={label}
              role="button"
              key={label}
              icon={IconComponent}
              className={extraClass}
              disabled={disabled}
              variant="outline"
            />
          );
        })}
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
          {newComp ? (
            <Plus className="size-5 text-white" />
          ) : (
            <Save className="size-5 text-white" />
          )}
        </Button>
      ) : (
        <Button role="action" size="icon" onClick={onCancel}>
          <X className="size-5 text-white" />
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
