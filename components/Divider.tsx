export function Divider({
  direction = "horizontal",
  style,
  className,
}: {
  direction?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={{
        width: direction === "horizontal" ? "100%" : "1px",
        height: direction === "horizontal" ? "1px" : "100%",
        background: "var(--surface-3)",
        flexShrink: 0,
        flexGrow: 0,
        ...style,
      }}
      className={className}
    />
  );
}
