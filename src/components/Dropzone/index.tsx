import React from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";

import styles from "./Dropzone.module.scss";

interface DropzoneProps {
  onDrop: (file: any) => void;
  className?: string;
  label?: string;
}

function Dropzone({
  onDrop,
  className,
  label = "Drop your file ",
}: DropzoneProps) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      className={classNames(styles.Container, className, {
        [styles.hasFile]: !!acceptedFiles?.[0]?.name,
      })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {acceptedFiles?.[0]?.name ? (
        <span className={styles.Label}>{acceptedFiles?.[0]?.name}</span>
      ) : (
        <span className={styles.Label}>{label}</span>
      )}
    </div>
  );
}

export default Dropzone;
