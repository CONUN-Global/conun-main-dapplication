import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { motion, useAnimation } from "framer-motion";

import Button from "../../components/Button";

import Checkmark from "../../assets/icons/checkmark.svg";
import Rocket from "../../assets/icons/rocket.svg";
import Clouds from "../../assets/icons/rocket-bg.svg";

import styles from "./PendingTransaction.module.scss";

const { api } = window;

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

const randomDuration = () => Math.random() * 0.1 + 0.15;

const rocketVariants = {
  start: (i) => ({
    rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
    transition: {
      ease: "linear",
      delay: getRandomDelay(),
      repeat: Infinity,
      duration: randomDuration(),
    },
  }),
  reset: {
    rotate: 0,
  },
};

const cloudVariants = {
  start: () => ({
    y: 4100,
    transition: {
      repeat: Infinity,
      duration: 50,
    },
  }),
};

async function animateRocket(animation) {
  await animation.start("start");
}

interface PendingTransactionProps {
  transferData: {
    amount: number;
    token: string;
    to: string;
  };
  txId: string;
}

function PendingTransaction({ transferData, txId }: PendingTransactionProps) {
  const [isTransactionSuccessful, setIsTransactionSuccessful] = useState(null);
  const { data } = useQuery(
    ["check-transaction", txId],
    () => api.checkTransaction(txId),
    {
      refetchInterval: 10000,
      enabled: transferData?.token !== "conx" && !isTransactionSuccessful,
    }
  );

  const animation = useAnimation();

  useEffect(() => {
    if (transferData?.token !== "conx" && data?.success) {
      setIsTransactionSuccessful(data?.data);
      api.setRecentTransacton({
        to: data?.data?.to,
        amount: transferData?.amount,
        token: transferData.token,
        txId: data?.data?.transactionHash,
        date: new Date().toISOString(),
      });
    }
  }, [data]);

  useEffect(() => {
    if (transferData?.token !== "conx" && !isTransactionSuccessful) {
      animateRocket(animation);
    }
  }, []);

  if (isTransactionSuccessful || transferData?.token === "conx") {
    return (
      <div className={styles.TransferPage}>
        <Checkmark className={styles.Checkmark} />
        <p className={styles.Title}>Transaction Complete</p>
        <div className={styles.SuccessBox}>
          <span className={styles.Amount}>
            {transferData?.amount} {transferData?.token}
          </span>
          <span className={styles.ToLabel}>to</span>
          <span className={styles.To}>{transferData?.to}</span>
        </div>
        <div className={styles.SuccessBox}>
          <p className={styles.TransactionIdLabel}>TX ID</p>
          <a
            href={
              transferData.token === "conx"
                ? `https://conscan.conun.io/txns/${txId}`
                : `https://ropsten.etherscan.io/tx/${txId}`
            }
            className={styles.TransactionId}
            target="_blank"
            rel="noreferrer"
          >
            {txId}
          </a>
        </div>
        <Button
          type="button"
          className={styles.CloseButton}
          onClick={() => api.closeTransferWindow()}
        >
          Close
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.InProgressPage}>
      <motion.div
        className={styles.RocketContainer}
        animate={animation}
        transition={{ duration: 10, repeat: Infinity }}
        variants={rocketVariants}
      >
        <Rocket className={styles.Rocket} />
      </motion.div>
      <motion.div
        className={styles.CloudsContainer}
        animate={animation}
        variants={cloudVariants}
      >
        <Clouds className={styles.Clouds} />
      </motion.div>

      <p className={styles.Text}>
        Transaction in progress, to check status click{" "}
        <a
          href={`https://ropsten.etherscan.io/tx/${txId}`}
          className={styles.TransactionLink}
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
      </p>
    </div>
  );
}

export default PendingTransaction;
