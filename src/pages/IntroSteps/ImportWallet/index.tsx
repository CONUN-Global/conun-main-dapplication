import React, { useState } from "react";

import Button from "../../../components/Button";
import Input from "../../../components/Form/Input";

import Arrow from "../../../assets/icons/arrow.svg";

import { StepProps } from "..";

import styles from "./ImportWallet.module.scss";

function ImportWallet({ setCurrentStep }: StepProps) {
  const [privateKey, setPrivateKey] = useState("");
  return (
    <>
      <Button
        type="button"
        onClick={() => setCurrentStep("termsAndConditions")}
        className={styles.BackButton}
        noStyle
      >
        <Arrow className={styles.Arrow} />
      </Button>
      <div className={styles.Title}>
        Do you have an Ethereum
        <br /> wallet to import?
      </div>
      <div className={styles.Subtitle}>
        If you have an existing Ethereum wallet you would like to import, enter
        your private key. Otherwise click “Create a new wallet.”
      </div>
      <Input
        label="Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        wrapperStyles={styles.KeyInput}
      />
      <Button
        type="button"
        disabled={!privateKey}
        round
        variant="secondary"
        className={styles.SyncButton}
        onClick={() => setCurrentStep("importWallet")}
      >
        Sync with Ethereum Wallet
      </Button>

      <div className={styles.NextButtonContainer}>
        <span className={styles.Text}>Create new wallet</span>
        <Button
          type="button"
          onClick={() => setCurrentStep("createWallet")}
          className={styles.ArrowButton}
          noStyle
        >
          <Arrow className={styles.Arrow} />
        </Button>
      </div>
    </>
  );
}

export default ImportWallet;
