"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
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
  const [isLightmode, setIsLightmode] = useState(
    document.body.classList.contains("light")
  );
  const { pending } = useFormStatus();
  return (
    <Button
      type="button"
      style={{
        position: "fixed",
        top: "var(--size-2)",
        right: "var(--size-2)",
        zIndex: 10,
      }}
      disabled={pending}
      onClick={async () => {
        const isLightmode = await props.action();
        setIsLightmode(isLightmode);
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
