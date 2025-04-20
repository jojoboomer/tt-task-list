import { Badge } from "./ui/badge";

interface Props {
  children: React.ReactNode;
  component: "badge" | "span";
  className: string;
  key: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const TextDecorator = ({
  key,
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
    <span key={key} className={className}>
      {children}
    </span>
  );
};
