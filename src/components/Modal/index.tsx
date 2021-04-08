import React from "react";
import { default as LModal, ReactModal } from "react-modal";
import classNames from "classnames";

import IconClose from "../../assets/icons/close.svg";

import styles from "./Modal.module.scss";

LModal.setAppElement("#app");

interface ModalProps extends ReactModal.Props {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  className?: string;
  onClose();
  styles?: Record<string, unknown>;
  withCloseIcon?: boolean;
}

function Modal({
  isOpen,
  children,
  title,
  styles: customStyles,
  className,
  onClose,
  withCloseIcon = false,
  ...props
}: ModalProps) {
  return (
    <LModal
      isOpen={isOpen}
      overlayClassName={classNames(styles.Overlay, customStyles?.Overlay)}
      bodyOpenClassName={classNames(
        styles.Overlay,
        customStyles?.ModalBodyOpen
      )}
      className={classNames(styles.Modal, className)}
      onRequestClose={onClose}
      closeTimeoutMS={300}
      {...props}
    >
      {title && (
        <div className={classNames(styles.Title, className)}>{title}</div>
      )}
      {withCloseIcon && (
        <div
          className={classNames(styles.Close, customStyles?.Content)}
          onClick={onClose}
        >
          <IconClose />
        </div>
      )}
      <div className={classNames(styles.Content, customStyles?.Content)}>
        {children}
      </div>
    </LModal>
  );
}

export default Modal;
