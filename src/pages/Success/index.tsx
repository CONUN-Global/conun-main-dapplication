import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { saveAs } from "file-saver";

import Modal from "../../components/Modal";
import Button from "../../components/Button";

import useAppCurrentUser from "../../hooks/useAppCurrentUser";

import Arrow from "../../assets/icons/arrow.svg";
import SuccessIcon from "../../assets/icons/success-icon.svg";

import getIdentity from "../../helpers/getIdentity";

import styles from "./Success.module.scss";

function saveFileIdentity(walletAddress: string) {
  const blob = new Blob([JSON.stringify(getIdentity())], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, `${walletAddress}.json`);
}

function Success() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { currentUser } = useAppCurrentUser();

  const history = useHistory();

  return (
    <div className={styles.SuccessPage}>
      <div className={styles.SuccessIconContainer}>
        <SuccessIcon className={styles.SuccessIcon} />
        <span className={styles.SuccessText}>
          Account Created
          <br /> Successfully!
        </span>
      </div>
      <p className={styles.Instructions}>
        Welcome to CONUN Distributed Supercomputing Platform. Please backup your
        account information by saving your JSON file.
      </p>
      <div className={styles.ExportContainer}>
        <div className={styles.JsonFileBox}>
          <span className={styles.Label}>JSON File</span>
          <Button
            type="button"
            onClick={() => saveFileIdentity(currentUser?.walletAddress)}
            noStyle
            className={styles.JsonIconContainer}
          >
            JSON
          </Button>
        </div>
      </div>
      <div className={styles.NextButtonContainer}>
        <span className={styles.Text}>Go to CONUN Manager</span>
        <Button
          type="button"
          onClick={() => setIsConfirmModalOpen(true)}
          noStyle
          className={styles.ArrowButton}
        >
          <Arrow className={styles.Arrow} />
        </Button>
      </div>
      <Modal
        isOpen={isConfirmModalOpen}
        className={styles.ConfirmModal}
        onClose={() => setIsConfirmModalOpen(false)}
        styles={styles}
      >
        <p className={styles.ConfirmText}>Did you save the JSON Wallet File?</p>
        <div className={styles.ButtonsContainer}>
          <Button
            type="button"
            onClick={() => setIsConfirmModalOpen(false)}
            variant="secondary"
            round
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={() => history.push("/home")}
            variant="primary"
            round
          >
            Yes
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Success;
