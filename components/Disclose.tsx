"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { ChevronDownIcon } from "./svg/ChevronDownIcon";
import {
  ButtonLink,
  ButtonSize,
  ButtonVariant,
} from "./ui/Button";

export function Disclose(props: {
  children: React.ReactNode;
  showText?: string;
  hideText?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: React.CSSProperties;
  renderButton?: React.ReactElement;
  controls?: {
    isDisclosed: boolean;
    setIsDisclosed: (isDisclosed: boolean) => void;
  };
  initialIsDisclosed?: boolean;
  noJsLink?: string;
}) {
  const buttonRef = React.useRef<HTMLAnchorElement>(null);
  const [s_isDisclosed, s_setIsDisclosed] = React.useState(
    props.initialIsDisclosed ?? false
  );
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

  function onChange(e: React.MouseEvent) {
    e.preventDefault();
    const newState = !isDisclosed;
    setIsDisclosed(newState);
    ScrollTrigger.refresh(true);
    if (newState === true) return;
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.scrollIntoView({
          behavior: "instant",
          block: "center",
        });
      }
    }, 50);
  }

  return (
    <>
      {isDisclosed && props.children}
      {props.renderButton ? (
        React.cloneElement(props.renderButton, {
          onClick: onChange,
          children,
          ref: buttonRef,
          href: props.noJsLink,
        })
      ) : (
        <ButtonLink
          onClick={onChange}
          style={{ width: "100%", ...props.style }}
          size={props.size}
          variant={props.variant}
          buttonRef={buttonRef}
          href={props.noJsLink ?? "#"}
        >
          {children}
        </ButtonLink>
      )}
    </>
  );
}
