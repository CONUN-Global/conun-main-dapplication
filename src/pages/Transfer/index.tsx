import React, { useEffect, useState } from "react";

import Button from "../../components/Button";

import useAppCurrentUser from "../../hooks/useAppCurrentUser";
import useTransfer from "../../hooks/useTransfer";

import styles from "./Transfer.module.scss";

const { api } = window;

function Tranfer() {
  const [transferData, setTransferData] = useState(null);
  const [success, setSuccess] = useState(null);

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

      setSuccess(data?.payload);

      api.requestBalanceRefetch();
    } catch (error) {
      // TODO: handle error
    }
  };

  if (success) {
    return (
      <div className={styles.TransferPage}>
        <div>
          <p>
            Transaction ID:{" "}
            <a
              href={`https://ropsten.etherscan.io/tx/${
                success?.TxID ?? success
              }`}
              target="_blank"
              rel="noreferrer"
            >
              <strong>{success?.TxID ?? success}</strong>
            </a>
          </p>
          <p>
            Amount:{" "}
            <strong>{success?.Func?.Amount ?? transferData?.amount}</strong>
          </p>
          {success?.Timestamp?.seconds && (
            <p>
              Timestamp:{" "}
              <strong>
                {new Date(success?.Timestamp?.seconds * 1000).toLocaleString()}
              </strong>
            </p>
          )}
        </div>

        <Button type="button" onClick={() => api.closeTransferWindow()}>
          Close
        </Button>
      </div>
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
