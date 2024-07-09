"use client";
import { styled } from "@pigment-css/react";
import React from "react";
import { CloseIcon } from "./svg/CloseIcon";
import { Button } from "./ui/Button";

export function Dialog(props: {
  children: React.ReactNode;
  renderButton?: React.ReactElement;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "subtle";
  buttonText?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
    const onStateChange = () => {
      setIsOpen(ref.current?.open ?? false);
    };
    const closeListener = () => {
      setIsOpen(false);
      ref.current?.close();
    };
    const el = ref.current;
    el?.addEventListener("open", onStateChange);
    el?.addEventListener("close", onStateChange);
    const closeButton = el?.querySelector("#close");
    closeButton?.addEventListener("click", closeListener);

    return () => {
      closeButton?.removeEventListener("click", closeListener);
      el?.removeEventListener("close", onStateChange);
      el?.removeEventListener("open", onStateChange);
    };
  }, [isOpen]);

  function onToggle() {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }

  return (
    <>
      <StyledDialog ref={ref} style={props.style}>
        <div>{props.children}</div>
        <Button
          size="sm"
          style={{
            position: "absolute",
            top: "var(--size-2)",
            right: "var(--size-2)",
            fontWeight: "var(--font-weight-9)",
          }}
          onClick={onToggle}
          variant="ghost"
        >
          <CloseIcon />
        </Button>
      </StyledDialog>
      {props.renderButton ? (
        React.cloneElement(props.renderButton, {
          onClick: onToggle,
          children: props.buttonText ?? "Open",
        })
      ) : (
        <Button
          onClick={onToggle}
          style={{ width: "100%" }}
          size={props.size}
          variant={props.variant}
        >
          {props.buttonText ?? "Open"}
        </Button>
      )}
    </>
  );
}

const StyledDialog = styled.dialog`
  margin: auto;
  padding: var(--size-5);
  width: min(100%, 500px);
  animation: var(--animation-fade-in-bloom) forwards,
    scaleInDialog 0.4s forwards;
  animation-timing-function: var(--ease-out-3);
  animation-duration: 0.3s;
  position: relative;
  & > div,
  & > div > form {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    & h2 {
      font-size: var(--font-size-fluid-2);
    }

    & label {
      display: flex;
      flex-direction: column;
      gap: var(--size-1);
      color: var(--text-6);
    }
  }

  @keyframes scaleInDialog {
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1);
    }
  }
`;
