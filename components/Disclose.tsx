"use client";

import React from "react";
import { Button, ButtonSize, ButtonVariant } from "./Button";
import { ChevronDown } from "./icons/ChevronDown";

export function Disclose(props: {
  children: React.ReactNode;
  showText?: string;
  hideText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  renderButton?: React.ReactElement;
}) {
  const [isDisclosed, setIsDisclosed] = React.useState(false);
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
