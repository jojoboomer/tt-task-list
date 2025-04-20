import { createInitialsAvatar, toSnakeCase } from "@/lib/string";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  disabled?: boolean;
  visible?: boolean;
  img?: string;
  name: string;
}

export const AvatarBtn = ({ disabled, visible, img, name }: Props) => {
  return (
    // Should be a router link
    <a
      href={!disabled ? "/" : undefined}
      className={`
        ${visible ? `flex` : `hidden`}
      ${disabled ? `opacity-50` : ""}`}
    >
      <Avatar>
        <AvatarImage
          src={img || createInitialsAvatar(name)}
          alt={name ? `${toSnakeCase(name)}-iamge` : "Placeholder user image"}
        />
        <AvatarFallback>{name ? name : "JL"}</AvatarFallback>
      </Avatar>
    </a>
  );
};
