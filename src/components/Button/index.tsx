import React from "react";
import classNames from "classnames";

import Spinner from "../Spinner";

import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  round?: boolean;
  loading?: boolean;
  noStyle?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

function Button({
  children,
  className,
  noStyle,
  round,
  loading = false,
  variant = "primary",
  ...props
}: ButtonProps) {
  if (noStyle) {
    return (
      <button
        className={classNames(styles.NoStyleButton, className)}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={classNames(styles.Button, className, styles[variant], {
        [styles.round]: round,
      })}
      {...props}
    >
      {loading ? <Spinner className={styles.Spinner} /> : children}
    </button>
  );
}

export default Button;
