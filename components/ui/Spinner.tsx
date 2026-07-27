type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-[3px]",
  lg: "h-10 w-10 border-4",
};

export default function Spinner({
  size = "md",
}: SpinnerProps) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-white/20 border-t-white ${sizes[size]}`}
      aria-label="Loading"
      role="status"
    />
  );
}