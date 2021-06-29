import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";
import { FieldError } from "react-hook-form";

import styles from "./FormInput.module.scss";

import inputStyles from "../../Input/Input.module.scss";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any;
  name?: string;
  round?: boolean;
  label?: string;
  error?: FieldError | undefined;
  wrapperStyles?: string;
}

function FormInput({
  name,
  id,
  type = "text",
  label,
  error,
  register,
  className,
  wrapperStyles,
  round,
  ...props
}: FormInputProps) {
  return (
    <div
      className={classNames(
        inputStyles.InputWrapper,
        wrapperStyles,
        {
          [styles.hasError]: !!error?.message,
        },
        {
          [inputStyles.round]: round,
        }
      )}
    >
      {!!label && (
        <label htmlFor={id || name} className={inputStyles.Label}>
          {label}
        </label>
      )}
      <input
        id={id}
        {...register}
        type={type}
        className={classNames(inputStyles.Input, className)}
        {...props}
      />
      {error?.message && <span className={styles.Error}>{error.message}</span>}
    </div>
  );
}

export default FormInput;
