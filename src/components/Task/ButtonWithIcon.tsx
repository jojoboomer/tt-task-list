 
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "../ui/button";

interface Props {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className: string;
  iconClassName?: string;
  labelClassName?: string;
}

const ButtonWithIcon = ({
  icon: Icon,
  label,
  className,
  iconClassName,
  labelClassName,
  variant = "outline",
  disabled,
  onClick,
}: Props &
  React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) => (
  <Button
    variant={variant}
    disabled={disabled}
    onClick={onClick}
    className={cn("text-tertiary border-border", className)}
  >
    {Icon && <Icon className={cn("size-5", iconClassName)} />}
    <span className={cn("hidden xl:block", labelClassName)}>{label}</span>
  </Button>
);

export default ButtonWithIcon;
