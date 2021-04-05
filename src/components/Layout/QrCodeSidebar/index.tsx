import React from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

import OutsideClickHandler from "../../OutsideClickHandler";

import { useAppContext } from "../../AppContext";

import QrCodePlaceholder from "../../../assets/icons/qr-code-placeholder.svg";
import QrCode from "../../../assets/icons/qr-code.svg";

import styles from "./QrCodeSidebar.module.scss";

const variants = {
  open: { x: -414 },
  closed: { x: 0 },
};

const qrPageVariants = {
  open: { x: 0 },
  closed: { x: 414 },
};

function QrCodeSidebar() {
  const { isQrCodeOpen, handleQRSidebar } = useAppContext();

  return (
    <OutsideClickHandler onClickOutside={() => handleQRSidebar(false)}>
      <motion.div
        className={classNames(styles.Sidebar, styles.isClosed)}
        animate={isQrCodeOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className={classNames(styles.QrButtonWrapper, styles.isClosed)}>
          <QrCodePlaceholder className={styles.QrCodePlaceholder} />
          <button
            className={classNames(styles.QrButton, styles.isClosed)}
            onClick={() => handleQRSidebar(true)}
          >
            <QrCode className={styles.QrCode} />
          </button>
        </div>
      </motion.div>
      <motion.div
        className={styles.QrCodePage}
        animate={isQrCodeOpen ? "open" : "closed"}
        variants={qrPageVariants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className={classNames(styles.Sidebar, styles.isOpen)}>
          <div className={classNames(styles.QrButtonWrapper, styles.isOpen)}>
            <QrCodePlaceholder className={styles.QrCodePlaceholderOpen} />
            <button
              className={classNames(styles.QrButton, styles.isOpen)}
              onClick={() => handleQRSidebar(false)}
            >
              <QrCode className={classNames(styles.QrCodeOpen)} />
            </button>
          </div>
        </div>
      </motion.div>
    </OutsideClickHandler>
  );
}

export default QrCodeSidebar;
