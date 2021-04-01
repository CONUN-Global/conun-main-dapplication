import React from "react";
import classNames from "classnames";

import styles from "./TextBox.module.scss";

interface TextBoxProps {
  children: React.ReactNode;
  className?: string;
  containerStyle: string;
}

function TextBox({ children, className, containerStyle }: TextBoxProps) {
  return (
    <div className={classNames(styles.TextBoxContainer, containerStyle)}>
      <div className={classNames(styles.TextBox, className)}>{children}</div>
    </div>
  );
}

export default TextBox;
