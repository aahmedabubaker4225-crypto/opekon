import type { HTMLAttributes } from "react";

type DividerProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: "horizontal" | "vertical";
};

export default function Divider({
  orientation = "horizontal",
  className = "",
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        {...props}
        className={`h-full w-px bg-white/10 ${className}`}
      />
    );
  }

  return (
    <hr
      {...props}
      className={`border-0 border-t border-white/10 ${className}`}
    />
  );
}