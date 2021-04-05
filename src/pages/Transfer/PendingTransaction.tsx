import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import Button from "../../components/Button";

import Checkmark from "../../assets/icons/checkmark.svg";

import styles from "./PendingTransaction.module.scss";

const { api } = window;

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
      enabled: transferData.token !== "conx" && !isTransactionSuccessful,
    }
  );

  useEffect(() => {
    if (transferData.token !== "conx" && data?.success) {
      setIsTransactionSuccessful(data?.data);
    }
  }, [data]);

  if (isTransactionSuccessful || transferData.token === "conx") {
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
            href={`https://ropsten.etherscan.io/tx/${txId}`}
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

  return <div className={styles.TransferPage}>Pending</div>;
}

export default PendingTransaction;
