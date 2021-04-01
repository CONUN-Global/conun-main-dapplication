import React from "react";
import classNames from "classnames";

import styles from "./Checkbox.module.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Checkbox({ id, label, className, ...props }: CheckboxProps) {
  return (
    <div className={classNames(styles.CheckboxContainer, className)}>
      <input id={id} type="checkbox" className={styles.Checkbox} {...props} />
      {label && (
        <label htmlFor={id} className={styles.Label}>
          {label}
        </label>
      )}
    </div>
  );
}

export default Checkbox;
