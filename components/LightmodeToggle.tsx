"use client";
import { useState } from "react";
import { useServerAction } from "../hooks/useServerAction";
import { Button } from "./Button";
import { Dark } from "./svg/Dark";
import { Light } from "./svg/Light";

const svgStyles: React.CSSProperties = {
  animation: "var(--animation-fade-in)",
  animationTimingFunction: "var(--ease-in-out-2)",
  animationDuration: "1s",
  animationIterationCount: "1",
};

export function LightmodeToggle(props: {
  onChange: () => Promise<boolean>;
  initialValue: boolean;
}) {
  return (
    <form>
      <SubmitButton action={props.onChange} />
    </form>
  );
}

function SubmitButton(props: {
  action: () => Promise<boolean>;
}) {
  const action = useServerAction(props.action);
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
        <Dark style={svgStyles} />
      ) : (
        <Light style={svgStyles} />
      )}
    </Button>
  );
}
