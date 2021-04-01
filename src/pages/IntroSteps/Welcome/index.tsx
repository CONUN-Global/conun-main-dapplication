import React from "react";

import Button from "../../../components/Button";

import useCurrentUser from "../../../hooks/useCurrentUser";

import { StepProps } from "..";

import styles from "./Welcome.module.scss";

function Welcome({ setCurrentStep }: StepProps) {
  const { currentUser } = useCurrentUser();

  return (
    <>
      {currentUser ? (
        <div>
          <div className={styles.Title}>
            Welcome back {currentUser?.givenName}
          </div>
        </div>
      ) : (
        <div className={styles.Title}>Welcome </div>
      )}
      <div className={styles.Subtitle}>
        Create an account and become a member of <br />
        CONUN Distruted Supercomputing Platform.
      </div>
      <div className={styles.ButtonsContainer}>
        {currentUser ? (
          <Button
            type="button"
            variant="secondary"
            round
            onClick={() => setCurrentStep("existingWallet")}
          >
            Access to existing wallet
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            round
            onClick={() => setCurrentStep("intro")}
          >
            Create New Wallet
          </Button>
        )}
      </div>
    </>
  );
}

export default Welcome;
