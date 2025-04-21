import { Badge } from "./ui/badge";

interface Props {
  children: React.ReactNode;
  component: "badge" | "span";
  className: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const TextDecorator = ({
  children,
  component,
  className,
  icon: Icon,
}: Props) => {
  if (component === "badge") {
    return (
      <Badge className={className}>
        {Icon && <Icon />}
        {children}
      </Badge>
    );
  }
  return (
    <span className={className}>
      {children}
    </span>
  );
};
