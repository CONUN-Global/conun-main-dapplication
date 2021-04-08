import React from "react";
import classNames from "classnames";
import { default as ReactSwitch } from "react-switch";

import styles from "./Switch.module.scss";

interface SwitchProps {
  id: string;
  label?: string;
  onChange: () => void;
  checked: boolean;
  className: any;
}

function Switch({ id, label, className, ...props }: SwitchProps) {
  return (
    <label htmlFor={id} className={classNames(styles.SwitchWrapper, className)}>
      <ReactSwitch
        id={id}
        className={styles.Switch}
        handleDiameter={12}
        height={14}
        width={30}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#184186"
        {...props}
      />
      {label && <span className={styles.Label}>{label}</span>}
    </label>
  );
}

export default Switch;
