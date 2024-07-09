"use client";

import React from "react";
import { ChevronDown } from "./icons/ChevronDown";
import { Button, ButtonSize, ButtonVariant } from "./ui/Button";

export function Disclose(props: {
  children: React.ReactNode;
  showText?: string;
  hideText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  renderButton?: React.ReactElement;
  controls?: {
    isDisclosed: boolean;
    setIsDisclosed: (isDisclosed: boolean) => void;
  };
}) {
  const [s_isDisclosed, s_setIsDisclosed] =
    React.useState(false);
  const isDisclosed =
    props.controls?.isDisclosed ?? s_isDisclosed;
  const setIsDisclosed =
    props.controls?.setIsDisclosed ?? s_setIsDisclosed;
  const children = (
    <>
      {isDisclosed
        ? props.hideText ?? "Hide"
        : props.showText ?? "Show"}
      <ChevronDown
        style={
          isDisclosed
            ? {
                rotate: "180deg",
                transformOrigin: "center center",
              }
            : {}
        }
      />
    </>
  );
  return (
    <>
      {isDisclosed && props.children}
      {props.renderButton ? (
        React.cloneElement(props.renderButton, {
          onClick: () => setIsDisclosed(!isDisclosed),
          children,
        })
      ) : (
        <Button
          onClick={() => setIsDisclosed(!isDisclosed)}
          style={{ width: "100%" }}
          size={props.size}
          variant={props.variant}
        >
          {children}
        </Button>
      )}
    </>
  );
}
