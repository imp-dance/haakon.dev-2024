import classNames from "classnames";
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
  }
) {
  const className = classNames(props.className, styles.button, {
    [styles.ghost]: props.variant === "ghost",
    [styles.subtle]: props.variant === "subtle",
    [styles.primary]: props.variant === "primary",
    [styles.secondary]: props.variant === "secondary",
    [styles.sm]: props.size === "sm",
    [styles.lg]: props.size === "lg",
  });

  return <button {...props} className={className} />;
}

export function ButtonLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
) {
  const className = classNames(
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

  return <a {...props} className={className} />;
}
