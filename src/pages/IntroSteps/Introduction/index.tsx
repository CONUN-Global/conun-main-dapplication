import React from "react";

import Button from "../../../components/Button";

import Arrow from "../../../assets/icons/arrow.svg";

import { StepProps } from "..";

import styles from "./Introduction.module.scss";

function Introduction({ setCurrentStep }: StepProps) {
  return (
    <>
      <Button
        type="button"
        onClick={() => setCurrentStep("welcome")}
        className={styles.BackButton}
        noStyle
      >
        <Arrow className={styles.Arrow} />
      </Button>
      <div className={styles.Title}>
        CONUN <br /> Supercomputer <br /> Distributing platform
      </div>
      <div className={styles.Subtitle}>
        CONUN’s Distributed Computing provides a universal comuting network
        architecture platform that enables distributed processing of personal
        computers connected to the internet based on desktop grid computing
      </div>
      <div className={styles.NextButtonContainer}>
        <span className={styles.Text}>Next</span>
        <Button
          type="button"
          noStyle
          onClick={() => setCurrentStep("termsAndConditions")}
          className={styles.ArrowButton}
        >
          <Arrow className={styles.Arrow} />
        </Button>
      </div>
    </>
  );
}

export default Introduction;
