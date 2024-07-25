import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import React from "react";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "subtle";
export type ButtonSize = "sm" | "md" | "lg";

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    buttonRef?: React.Ref<HTMLButtonElement>;
  }
) {
  const className = classNames(
    "_btn",
    props.className,
    styles.button,
    {
      [styles.ghost]: props.variant === "ghost",
      [styles.subtle]: props.variant === "subtle",
      [styles.primary]: props.variant === "primary",
      [styles.secondary]: props.variant === "secondary",
      [styles.sm]: props.size === "sm",
      [styles.lg]: props.size === "lg",
    }
  );

  const { buttonRef, ...rest } = props;

  return (
    <button {...rest} className={className} ref={buttonRef} />
  );
}

export function ButtonLink(
  props: LinkProps & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  } & {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    title?: string;
    target?: string;
    buttonRef?: React.Ref<HTMLAnchorElement>;
    onKeyDown?: React.KeyboardEventHandler;
  }
) {
  const className = classNames(
    "_btn",
    props.className,
    styles.button,
    "btn",
    {
      [styles.ghost]: props.variant === "ghost",
      [styles.subtle]: props.variant === "subtle",
      [styles.primary]: props.variant === "primary",
      [styles.secondary]: props.variant === "secondary",
      [styles.sm]: props.size === "sm",
      [styles.lg]: props.size === "lg",
    }
  );

  return (
    <Link
      {...props}
      className={className}
      ref={props.buttonRef}
    />
  );
}
