"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { ChevronDownIcon } from "./svg/ChevronDownIcon";
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
      <ChevronDownIcon
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

  function onChange() {
    setIsDisclosed(!isDisclosed);
    ScrollTrigger.refresh(true);
  }

  return (
    <>
      {isDisclosed && props.children}
      {props.renderButton ? (
        React.cloneElement(props.renderButton, {
          onClick: onChange,
          children,
        })
      ) : (
        <Button
          onClick={onChange}
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
