"use client";
import { useState } from "react";
import { toggleLightmode } from "../actions/lightmode";
import { useServerAction } from "../hooks/useServerAction";
import { MoonIcon } from "./svg/MoonIcon";
import { SunIcon } from "./svg/SunIcon";
import { Button } from "./ui/Button";

const svgStyles: React.CSSProperties = {
  animation: "var(--animation-fade-in)",
  animationTimingFunction: "var(--ease-in-out-2)",
  animationDuration: "1s",
  animationIterationCount: "1",
};

export function LightmodeToggle() {
  return (
    <form>
      <InnerLightmodeToggle />
    </form>
  );
}

function InnerLightmodeToggle() {
  const action = useServerAction(toggleLightmode);
  const [isLightmode, setIsLightmode] = useState(
    typeof document !== "undefined" &&
      document.body.classList.contains("light")
  );

  return (
    <Button
      type="button"
      style={{
        position: "fixed",
        top: "var(--size-2)",
        right: "var(--size-2)",
        zIndex: 10,
      }}
      disabled={action.isPending}
      onClick={async () => {
        const newLightmode = await action.runAction();
        setIsLightmode(newLightmode ?? !isLightmode);
      }}
      variant="ghost"
    >
      {isLightmode ? (
        <MoonIcon style={svgStyles} />
      ) : (
        <SunIcon style={svgStyles} />
      )}
    </Button>
  );
}
