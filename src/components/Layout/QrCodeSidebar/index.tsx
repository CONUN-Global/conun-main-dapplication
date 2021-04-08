import React from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { saveAs } from "file-saver";

import OutsideClickHandler from "../../OutsideClickHandler";
import Button from "../../Button";

import { useAppContext } from "../../AppContext";
import useAppCurrentUser from "../../../hooks/useAppCurrentUser";

import QrCodePlaceholder from "../../../assets/icons/qr-code-placeholder.svg";
import QrCode from "../../../assets/icons/qr-code.svg";

import getIdentity from "../../../helpers/getIdentity";

import styles from "./QrCodeSidebar.module.scss";

const { api } = window;

const variants = {
  open: { x: -414 },
  closed: { x: 0 },
};

const qrPageVariants = {
  open: { x: 0 },
  closed: { x: 414 },
};

function saveFileIdentity(
  identity: Record<string, unknown>,
  walletAddress: string
) {
  const blob = new Blob([JSON.stringify(identity)], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, `${walletAddress}.json`);
}

function QrCodeSidebar() {
  const { isQrCodeOpen, handleQRSidebar } = useAppContext();
  const { currentUser } = useAppCurrentUser();

  const { data } = useQuery(
    "get-qr-code-wallet-address",
    () => api.createQrCode({ walletAddress: currentUser?.walletAddress }),
    {
      enabled: !!currentUser,
    }
  );

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
        <span className={styles.Title}>Ethereum Wallet</span>
        <div className={styles.QrCodeBox}>
          <img src={data} className={styles.QrCode} alt="qr code" />
        </div>
        <span className={styles.Instructions}>
          You can use the QR code to
          <br /> share your wallet address
        </span>
        <div className={styles.AddressContainer}>
          <span className={styles.Label}>Wallet Address</span>
          <Button
            type="button"
            noStyle
            onClick={() =>
              navigator.clipboard.writeText(currentUser?.walletAddress)
            }
            className={styles.WalletAddress}
          >
            {currentUser?.walletAddress}
          </Button>
        </div>
        <Button
          type="button"
          onClick={() =>
            saveFileIdentity(getIdentity(), currentUser?.walletAddress)
          }
          className={styles.ExportButton}
          variant="secondary"
          round
        >
          Export JSON File
        </Button>
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
