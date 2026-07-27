import type { HTMLAttributes } from "react";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

function getInitials(name?: string) {
  if (!name) return "?";

  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Avatar({
  name,
  src,
  size = "md",
  className = "",
  ...props
}: AvatarProps) {
  return (
    <div
      {...props}
      className={`flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 font-semibold text-white ${sizes[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={name ?? "Avatar"}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}