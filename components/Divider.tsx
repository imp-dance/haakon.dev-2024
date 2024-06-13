export function Divider({
  direction = "horizontal",
}: {
  direction?: "horizontal" | "vertical";
}) {
  return (
    <div
      style={{
        width: direction === "horizontal" ? "100%" : "1px",
        height: direction === "horizontal" ? "1px" : "100%",
        background: "var(--surface-3)",
        flexShrink: 0,
        flexGrow: 0,
      }}
    />
  );
}
