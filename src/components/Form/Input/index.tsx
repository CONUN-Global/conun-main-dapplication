import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperStyles?: string;
  round?: boolean;
}

function Input({
  name,
  id,
  type = "text",
  label,
  className,
  round,
  wrapperStyles,
  ...props
}: InputProps) {
  return (
    <div
      className={classNames(styles.InputWrapper, wrapperStyles, {
        [styles.round]: round,
      })}
    >
      {!!label && (
        <label htmlFor={id || name} className={styles.Label}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        className={classNames(styles.Input, className)}
        {...props}
      />
    </div>
  );
}

export default Input;
