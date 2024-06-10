"use client";
import { useState } from "react";
import { Button } from "./Button";
import { Dark } from "./svg/Dark";
import { Light } from "./svg/Light";

const svgStyles: React.CSSProperties = {
  animation: "var(--animation-float), var(--animation-shake-x)",
  animationTimingFunction: "var(--ease-in-out-2)",
  animationDuration: "0.45s",
  animationIterationCount: "1",
};

export function LightmodeToggle(props: {
  onChange: () => Promise<boolean>;
  initialValue: boolean;
}) {
  const [isLightmode, setIsLightmode] = useState(false);

  return (
    <form action={props.onChange}>
      <input
        type="hidden"
        name="isLightmode"
        value={isLightmode.toString()}
      />
      <Button
        type="submit"
        style={{
          position: "fixed",
          top: "var(--size-2)",
          right: "var(--size-2)",
          zIndex: 10,
        }}
        onClick={() => {
          setIsLightmode(!isLightmode);
        }}
        variant="ghost"
      >
        {isLightmode ? (
          <Dark style={svgStyles} />
        ) : (
          <Light style={svgStyles} />
        )}
      </Button>
    </form>
  );
}
