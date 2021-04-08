import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import PendingTransaction from "./PendingTransaction";

import useAppCurrentUser from "../../hooks/useAppCurrentUser";
import useTransfer from "../../hooks/useTransfer";

import styles from "./Transfer.module.scss";

const { api } = window;

function Tranfer() {
  const [transferData, setTransferData] = useState(null);
  const [transactionStarted, setTransactionStarted] = useState(null);

  const { currentUser } = useAppCurrentUser();

  const { transfer, loading } = useTransfer({
    token: transferData?.token,
  });

  useEffect(() => {
    api.listenToTransferData((args) => {
      setTransferData(args);
    });
  }, []);

  const handleTransfer = async () => {
    try {
      const data = await transfer(transferData);
      if (data?.payload?.TxID) {
        api.setRecentTransacton({
          to: data?.payload?.Func?.To,
          amount: data?.payload?.Func?.Amount,
          txId: data?.payload?.TxID,
          token: transferData.token,
          date: new Date().toISOString(),
        });
      }

      setTransactionStarted(data?.payload);
      api.requestBalanceRefetch();
    } catch (error) {
      toast.error("An error happened", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
      });
    }
  };

  if (transactionStarted) {
    return (
      <PendingTransaction
        transferData={transferData}
        txId={transactionStarted?.TxID ?? transactionStarted}
      />
    );
  }

  return (
    <div className={styles.TransferPage}>
      <p className={styles.Title}>Review Transaction</p>
      <div className={styles.TotalContainer}>
        <p className={styles.TotalTitle}>Total</p>
        <div className={styles.Box}>
          {transferData?.token === "conx" ? (
            <p className={styles.Amount}>
              {`${transferData?.amount} ${transferData?.token}`}
            </p>
          ) : (
            <p className={styles.Amount}>
              {`${(+transferData?.amount + +transferData?.fee).toFixed(6)} ${
                transferData?.token
              }`}
            </p>
          )}
        </div>
      </div>
      <div className={styles.WalletDetailsContainer}>
        <p className={styles.WalletTitle}>Wallet Details</p>
        <div className={styles.Box}>
          <div className={styles.WalletDetail}>
            <span className={styles.Label}>To</span>
            <span className={styles.Address}>{transferData?.to}</span>
          </div>
          <div className={styles.WalletDetail}>
            <span className={styles.Label}>From</span>
            <span className={styles.Address}>{currentUser?.walletAddress}</span>
          </div>
        </div>
      </div>
      <div className={styles.ButtonsContainer}>
        <Button
          type="button"
          variant="secondary"
          className={styles.Button}
          disabled={loading}
          onClick={() => api.closeTransferWindow()}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className={styles.Button}
          loading={loading}
          onClick={handleTransfer}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default Tranfer;
